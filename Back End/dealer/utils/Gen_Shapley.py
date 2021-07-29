import random
from sklearn import svm
from sklearn.metrics import accuracy_score
from tqdm import trange

import dealer.utils.Shapley as Shapley


class Model():
    def __init__(self, model, X_test, y_test):
        if model == 'svm':
            self.clf = svm.SVC(decision_function_shape='ovo')
        self.X_test = X_test
        self.y_test = y_test

    def model(self, X_train, y_train):
        if len(set(y_train)) == 0:
            return 0
        if len(set(y_train)) > 1:
            self.clf.fit(X_train, y_train)
            y_pred = self.clf.predict(self.X_test)
        else:
            y_pred = [y_train[0] for k in range(len(self.X_test))]

        return accuracy_score(self.y_test, y_pred)


def gen_random_permutation(index):
    n = len(index)
    for i in range(n):
        to = i + random.randint(0, n - i - 1)
        temp = index[i]
        index[i] = index[to]
        index[to] = temp

    return index


def eval_monte_carlo(dataset, index, sample_number):
    if dataset == "cancer":
        training_features, testing_features, training_labels, testing_labels = Shapley.loadCancer_(index)
    elif dataset == "chess":
        training_features, testing_features, training_labels, testing_labels = Shapley.loadChess_(index)
    else:
        training_features, testing_features, training_labels, testing_labels = Shapley.loadIris_(index)

    model = Model('svm', testing_features, testing_labels)
    acc = model.model(training_features, training_labels)
    shapley = dict()
    for step in trange(sample_number):
        index = gen_random_permutation(index)
        original_accuracy = 0
        for j in range(1, len(index) + 1):
            if dataset == 'cancer':
                training_features, testing_features, training_labels, testing_labels = Shapley.loadCancer_(index[:j])
            elif dataset == "chess":
                training_features, testing_features, training_labels, testing_labels = Shapley.loadCancer_(index[:j])
            else:
                training_features, testing_features, training_labels, testing_labels = Shapley.loadIris_(index[:j])
            current_accuracy = model.model(training_features, training_labels)
            if index[j - 1] in shapley:
                shapley[index[j - 1]] += current_accuracy - original_accuracy
            else:
                shapley[index[j - 1]] = current_accuracy - original_accuracy
            original_accuracy = current_accuracy

    for key in shapley.keys():
        shapley[key] /= sample_number

    return acc, shapley
