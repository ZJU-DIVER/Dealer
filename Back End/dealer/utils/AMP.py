import os
import sys
import numpy as np
from dealer.utils.algorithms.approximate_minima_perturbation import ApproximateMinimaPerturbationLR, \
    ApproximateMinimaPerturbationSVM
from dealer.utils.common.common import compute_classification_counts, compute_multiclass_counts
from itertools import product
from decimal import Decimal
import dealer.utils.Shapley as Shapley

# To run this script, please input command line
# python gridsearch.py [alg_name] [dataset_name] [random_proj] [SVM] [eps_list...]
# To get the best performance, first run this:
# export OMP_NUM_THREADS=1
result_root = '.'
lbls_dim = 2
multivariate_datasets = ['covertype', 'mnist', 'o185', 'o313', 'o4550', 'PEMS', 'wine']
sparse_datasets = ['farm', 'dexter', 'dorothea', 'realsim', 'rcv1', 'news20']
data2shape = {'farm': (4143, 54877), 'dexter': (300, 20000), 'dorothea': (800, 100000), 'realsim': (72309, 20958),
              'rcv1': (50000, 47236), 'news20': (8870, 117049)}

# How many times to repeat each experiment
NUM_REPEATS = 1

# How many cores to use
CORES = 40

# The default clipping factor to use
L = 1
L1_L = 1


# Epsilons to test


def build_binary_ys(vec_ys):
    # print('vec_ys.shape', vec_ys.shape)
    # print('vec_ys:', vec_ys)
    binary_ys = []
    for i in range(vec_ys.shape[1]):
        print(vec_ys[:, i])
        binary_ys.append(np.array([1 if y == 1 else -1 for y in vec_ys[:, i]]))
    # print('binary_ys:', binary_ys)
    return binary_ys


def dict_product(dicts):
    return (dict(zip(dicts, x)) for x in product(*dicts.values()))


def progress_bar(pct):
    i = int(pct)
    sys.stdout.write('\r')
    sys.stdout.write("[%-20s] %d%%" % ('=' * int(i / 5), i))
    sys.stdout.flush()


def approximate_minima_perturbation(training_features, training_labels, eps, delta, hyper, model):
    if model == 'LR':
        theta, gamma = ApproximateMinimaPerturbationLR.run_classification(training_features, training_labels, eps,
                                                                          delta,
                                                                          hyper['lambda_param'],
                                                                          hyper['learning_rate'],
                                                                          hyper['iterations'],
                                                                          hyper['l2_constraint'],
                                                                          hyper['eps_frac'],
                                                                          hyper['eps_out_frac'],
                                                                          hyper['gamma'],
                                                                          hyper['L'])
    else:
        theta, gamma = ApproximateMinimaPerturbationSVM.run_classification(training_features, training_labels, eps,
                                                                           delta,
                                                                           hyper['lambda_param'],
                                                                           hyper['learning_rate'],
                                                                           hyper['iterations'],
                                                                           hyper['l2_constraint'],
                                                                           hyper['eps_frac'],
                                                                           hyper['eps_out_frac'],
                                                                           hyper['gamma'],
                                                                           hyper['L'])
    # counter.append(0)
    # progress_bar(len(counter)*100/total_configurations)
    return theta, hyper['L'], gamma


def create_directory(directory_name):
    try:
        os.stat(directory_name)
    except:
        os.mkdir(directory_name)


def amp_main(chose_dataset, all_eps_list, num_repeats=None):
    print("Starting...")
    np.seterr(over='ignore')

    create_directory(result_root + "/results")
    create_directory(result_root + "/results/rough_results")
    create_directory(result_root + "/results/rough_results/LR")
    create_directory(result_root + "/results/rough_results/SVM")
    create_directory(result_root + "/results/graphs")
    create_directory(result_root + "/results/graphs/LR")
    create_directory(result_root + "/results/graphs/SVM")

    alg_name = 'AMP'
    model_name = 'SVM'

    print("Loading Dataset...")

    result_location = result_root + '/results/rough_results/' + model_name

    if chose_dataset == 'cancer':
        training_features, testing_features, training_labels, testing_labels = Shapley.loadCancer()
    else:
        training_features, testing_features, training_labels, testing_labels = Shapley.loadChess()

    print(training_features.shape, testing_features.shape, training_labels.shape, testing_labels.shape)
    training_size = len(training_features)
    training_labels_ = []
    for i in training_labels:
        tmp = [0 for _ in range(lbls_dim)]
        tmp[int(i)] = 1
        training_labels_.append(tmp)
    training_labels_ = np.array(training_labels_)
    print('training_labels_[0]:', training_labels_[0])
    testing_labels_ = []
    for i in testing_labels:
        tmp = [0 for _ in range(lbls_dim)]
        tmp[int(i)] = 1
        testing_labels_.append(tmp)
    testing_labels_ = np.array(testing_labels_)

    if len(sys.argv) > 3:
        accfile = open(os.path.join(result_location, alg_name + '_' + sys.argv[3] + '.acc'), 'w')
        stdfile = open(os.path.join(result_location, alg_name + '_' + sys.argv[3] + '.std'), 'w')
        logfile = open(os.path.join(result_location, alg_name + '_' + sys.argv[3] + '.log'), 'w')
    else:
        accfile = open(os.path.join(result_location, alg_name + '.acc'), 'w')
        stdfile = open(os.path.join(result_location, alg_name + '.std'), 'w')
        logfile = open(os.path.join(result_location, alg_name + '.log'), 'w')

    acc_matrix = np.zeros([2, 9])
    std_matrix = np.zeros([2, 9])
    acc_matrix[0] = np.ones(9)
    n = training_size

    AMP = {
        'fun': approximate_minima_perturbation,
        'hyper': {
            'lambda_param': [None],
            'learning_rate': [None],
            'iterations': [None],
            'l2_constraint': [None],
            'eps_frac': [.9],
            'eps_out_frac': [.5],
            'gamma': [1 / (n ** 2)],
            'L': [1]
        }
    }

    eps_list = all_eps_list
    result = []

    print('Running AMP')

    for eps in eps_list:
        training_subset_features = training_features
        training_subset_labels = training_labels
        training_subset_size = training_subset_features.shape[0]
        print('eps:', eps, 'training_subset_size', training_subset_size)
        training_subset_labels_ = []
        for i in training_subset_labels:
            tmp = np.zeros(lbls_dim)
            tmp[int(i)] = 1
            training_subset_labels_.append(tmp)
        training_subset_labels_ = np.array(training_subset_labels_)

        datasets_l = {}
        for L in AMP['hyper']['L']:
            datasets_l[L] = {}
            datasets_l[L]['training'] = training_subset_features
            datasets_l[L]['testing'] = testing_features

        delta = 1 / (training_subset_size ** 2)
        if num_repeats == None:
            repeat_time = NUM_REPEATS
        else:
            repeat_time = num_repeats

        hypers_ = AMP['hyper']
        hypers = list(dict_product(hypers_))

        for hyper in hypers:
            for time in range(repeat_time):
                train_ys = build_binary_ys(training_subset_labels_)
                thetas = np.zeros(shape=(training_subset_labels_.shape[1], training_subset_features.shape[1]))

                for i, binary_train_y in enumerate(train_ys):
                    ret = approximate_minima_perturbation(datasets_l[hyper['L']]['training'], binary_train_y,
                                                          eps / training_subset_labels_.shape[1],
                                                          delta / training_subset_labels_.shape[1], hyper, model_name)
                    result.append(ret)

    results = np.array([res for res in result])
    print()

    result = []
    thetas, Ls, gammas = zip(*results)
    thetas = np.array(list(thetas))
    Ls = np.array(list(Ls))
    gammas = np.array(list(gammas))

    thetas_len = len(train_ys)
    thetas = thetas.reshape([-1, len(train_ys), len(thetas[0])])

    gammas = gammas.reshape([-1, len(train_ys)])
    gammas = np.average(gammas, axis=1)

    Ls = Ls[::thetas_len]

    results = list(zip(thetas, Ls, gammas))
    for theta, L, gamma in results:
        ret = compute_multiclass_counts(datasets_l[L]['testing'], testing_labels_, theta)
        result.append(ret)
    correct_incorrect_counts = np.array([res for res in result])

    accuracy_list = np.array([correct / (correct + incorrect) for correct, incorrect in correct_incorrect_counts])
    gamma_list = np.array([gamma for theta, L, gamma in results]).reshape([len(eps_list), -1, repeat_time])
    correct_list = np.array(accuracy_list).reshape([len(eps_list), -1, repeat_time])

    ave_list = np.average(correct_list, axis=2)
    std_list = np.std(correct_list, axis=2)
    gamma_list = np.average(gamma_list, axis=2)

    combined_list_ = list(zip(ave_list, std_list))
    combined_list = [list(zip(i, j)) for i, j in combined_list_]
    max_correct_list = [max(i, key=(lambda x: x[0])) for i in combined_list]
    print('eps', end='')
    print('eps', end='', file=logfile)

    hyperparameter_names = sorted(list(hypers[0].keys()), key=str.lower)

    for name in hyperparameter_names:
        print('\t{0}'.format(name[:3]), end='')
        print('\t{0}'.format(name[:3]), end='', file=logfile)
    print('\tave\tstd\tgamma')
    print('\tave\tstd\tgamma', file=logfile)

    for i, eps in enumerate(eps_list):

        for j, hyper in enumerate(hypers):
            for name in hyperparameter_names:
                if name == 'gamma' and hyper[name] != None:
                    print('\t{:.2e}'.format(Decimal(hyper[name])), end='')
                    print('\t{:.2e}'.format(Decimal(hyper[name])), end='', file=logfile)
                else:
                    print('\t{0}'.format(hyper[name]), end='')
                    print('\t{0}'.format(hyper[name]), end='', file=logfile)
            print('\t{:.3f}\t{:.3f}\t{:.3e}'.format(ave_list[i, j], std_list[i, j], gamma_list[i, j]))
            print('\t{:.3f}\t{:.3f}\t{:.3e}'.format(ave_list[i, j], std_list[i, j], gamma_list[i, j]), file=logfile)

        print('------------------------------------------------------------')
        print('best result for eps:{0} is ave:{1} and std:{2}'.format(eps, max_correct_list[i][0],
                                                                      max_correct_list[i][1]))
        print('------------------------------------------------------------')
        print('------------------------------------------------------------', file=logfile)
        print('best result for eps:{0} is ave:{1} and std:{2}'.format(eps, max_correct_list[i][0],
                                                                      max_correct_list[i][1]), file=logfile)
        print('------------------------------------------------------------', file=logfile)

        for i in range(len(eps_list)):
            acc_matrix[1, i] = max_correct_list[i][0]
            std_matrix[1, i] = max_correct_list[i][1]

    for i in range(acc_matrix.shape[0]):
        print(','.join(str(acc_matrix[1, j]) for j in range(9)), file=accfile)
        print(','.join(str(std_matrix[1, j]) for j in range(9)), file=stdfile)

    print('Wrote results to ' + accfile.name + ' (.std, .log)')
    print('Finish Running')

    ret = []
    for i in range(len(eps_list)):
        res = {
            "epsilon": eps_list[i],
            "accuracy": max_correct_list[i][0],
        }
        ret.append(res)

    return ret
