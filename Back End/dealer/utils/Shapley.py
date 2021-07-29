import numpy as np
from dealer import models


def randslt(SV, ec, budsum, X_train=None, y_train=None):
    idx_lst = np.arange(len(SV))
    np.random.shuffle(idx_lst)
    idx_subset = []
    X_subset = []
    y_subset = []

    optsum = 0
    for idx in idx_lst:
        if budsum - ec[idx] > 0:
            # print(idx, ':', SV[idx], ec[idx])
            idx_subset.append(idx)
            optsum += SV[idx]
            budsum -= ec[idx]
            X_subset.append(X_train[idx])
            y_subset.append(y_train[idx])
        else:
            break
    print('random selsection:', len(X_subset), optsum, idx_subset)
    return optsum, X_subset, y_subset


def get_ratio(SV, ec):
    ratio = []
    for i in range(len(SV)):
        ratio.append((i, SV[i] / ec[i]))

    sorted_ratio = sorted(ratio, key=lambda x: x[1], reverse=True)
    return sorted_ratio


def greedy(SV, ec, budsum, X_train, y_train):
    sorted_ratio = get_ratio(SV, ec)

    X_subset = []
    y_subset = []
    idx_subset = []
    SVsum = 0
    for i in range(len(sorted_ratio)):
        idx = sorted_ratio[i][0]
        if budsum - ec[idx] > 0:
            idx_subset.append(idx)
            SVsum += SV[idx]
            budsum -= ec[idx]
            X_subset.append(X_train[idx])
            y_subset.append(y_train[idx])
        else:
            break
    print('greedy:', len(X_subset), SVsum, idx_subset)

    return SVsum, X_subset, y_subset


def get_subset(h, N):
    if h == 1:
        return [[i] for i in range(N)]
    if h == 2:
        s = []
        for i in range(N):
            for j in range(i + 1, N):
                s.append([i, j])
        return s


def guess_greedy(SV, ec, budsum, X_train, y_train):
    SV = np.asarray(SV)
    ec = np.asarray(ec)
    sorted_ratio = get_ratio(SV, ec)

    _S = []
    for i in range(2):
        _S.extend(get_subset(i + 1, len(X_train)))
    S_dict = {}
    for idx in range(len(_S)):
        s = _S[idx]
        cost = sum(ec[s])
        if cost > budsum:
            continue
        sv = sum(SV[s])
        S_dict[idx] = (cost, sv)

    for idx in S_dict.keys():
        cost, sv = S_dict[idx]
        s = _S[idx]
        for i in range(len(sorted_ratio)):
            j = sorted_ratio[i][0]

            if j in s:
                continue

            if cost + ec[j] < budsum:
                # print(idx, ':', SV[idx], ec[idx])
                s.append(j)
                sv += SV[j]
                cost += ec[j]
            else:
                break

        S_dict[idx] = (cost, sv)

    opt = sorted(S_dict.items(), key=lambda x: (x[1], -x[0]), reverse=True)[0]
    s = _S[opt[0]]
    X_subset = list(np.asarray(X_train)[s])
    y_subset = list(np.asarray(y_train)[s])
    print('maxSV:', opt[1][1])
    return opt[1][1], X_subset, y_subset


def GCD(a, b):
    if b == 0:
        return a
    else:
        return GCD(b, a % b)


def findGCD(lst):
    a = lst[0]
    b = lst[1]
    gcd = GCD(max(a, b), min(a, b))
    for i in range(2, len(lst)):
        gcd = GCD(max(gcd, lst[i]), min(gcd, lst[i]))
    return gcd


def approximate(lst):
    i = min(lst)
    a = 1
    while int(i) == 0:
        a *= 10
        i *= a
    lst = [a * _ for _ in lst]
    ret = []
    for i in lst:
        ret.append(int(i))
    return a, ret


def DPSV(SV, ec, budsum, X_train, y_train):
    bcec = [ec[i] for i in range(len(SV))]
    a, bcec = approximate(bcec)
    budsum *= a
    print(bcec)

    gcd = findGCD(bcec)
    print('gcd:', gcd)

    nrow = len(SV) + 1
    ncol = int(budsum / gcd + 1)
    matrix = []
    for i in range(nrow):
        matrix.append([0] * ncol)

    for i in range(1, nrow):
        for j in range(1, ncol):
            if j < int(bcec[i - 1] / gcd):
                matrix[i][j] = matrix[i - 1][j]
            else:
                matrix[i][j] = max(matrix[i - 1][j], SV[i - 1] + matrix[i - 1][j - int(bcec[i - 1] / gcd)])
    path = []
    _max = 0
    _id = 0
    # print('matrix:', matrix)

    for j in range(0, ncol):
        if _max < matrix[nrow - 1][j]:
            _max = matrix[nrow - 1][j]
            _id = j

    for i in range(nrow - 1, 1, -1):
        if matrix[i][_id] != matrix[i - 1][_id]:
            path.append(i)
            _id -= int(bcec[i - 1] / gcd)

    if matrix[1][_id] > 0:
        path.append(1)

    X_subset = []
    y_subset = []
    print('dpsv:', len(path), _max, path)
    for i in range(len(path)):
        X_subset.append(X_train[path[i] - 1])
        y_subset.append(y_train[path[i] - 1])

    return _max, X_subset, y_subset


def main(SV_train, X_train, X_test, y_train, y_test, eps_list, budeps, bp, ps, mode='GREEDY', portion=1):
    SV_dic = {}
    for i in range(len(SV_train)):
        SV_dic[i] = SV_train[i]
    sorted_dic = sorted(SV_dic.items(), key=lambda x: x[1], reverse=True)
    idx = []
    for sv in sorted_dic:
        idx.append(sv[0])

    SV_train = np.array(SV_train)
    X_train = np.array(X_train)
    y_train = np.array(y_train)
    SV_train = SV_train[idx]
    X_train = X_train[idx]
    y_train = y_train[idx]

    budsum = sum(SV_train)
    print('budsum:', budsum)

    X_train_subset_dic = {}
    y_train_subset_dic = {}
    coverage = []
    total = []
    for eps in eps_list:

        print('eps / budget: ', eps, budeps)
        ecs = []
        for _ in SV_train:
            ecs.append(bp * _ / sum(SV_train) * pow(np.math.e, ps * eps))
        total.append(sum(ecs))

        if mode == 'GREEDY':
            optsum, X_train_subset, y_train_subset = greedy(SV_train, ecs, budeps, X_train, y_train)
        elif mode == 'DP':
            optsum, X_train_subset, y_train_subset = DPSV(SV_train, ecs, budeps, X_train, y_train)
        elif mode == 'GUE-GRD':
            optsum, X_train_subset, y_train_subset = guess_greedy(SV_train, ecs, budeps, X_train, y_train)
        else:
            optsum, X_train_subset, y_train_subset = randslt(SV_train, ecs, budeps, X_train, y_train)
        X_train_subset_dic[eps] = X_train_subset
        y_train_subset_dic[eps] = y_train_subset
        coverage.append(min(1, optsum / sum(SV_train)))

    return X_train_subset_dic, y_train_subset_dic, coverage, total


def loadCancer_(valid_idx=None):
    if valid_idx is None:
        valid_idx = []

    train_cancer = np.array([list(i) for i in models.TrainCancer.objects.all().values_list()])
    test_cancer = np.array([list(i) for i in models.TestCancer.objects.all().values_list()])

    X_train = []
    y_train = []
    idx = 0
    for item in train_cancer:
        if idx not in valid_idx:
            idx += 1
            continue
        idx += 1
        X_train.append(item[1:-1])
        y_train.append(item[-1])

    X_test = test_cancer[:, 1:-1]
    y_test = test_cancer[:, -1]

    return np.array(X_train), np.array(X_test), np.array(y_train), np.array(y_test)


def loadChess_(valid_idx=None):
    if valid_idx is None:
        valid_idx = []

    train_cancer = np.array([list(i) for i in models.TrainCancer.objects.all().values_list()])
    test_cancer = np.array([list(i) for i in models.TestCancer.objects.all().values_list()])

    X_train = []
    y_train = []
    idx = 0
    for item in train_cancer:
        if idx not in valid_idx:
            idx += 1
            continue
        idx += 1
        X_train.append(item[1:-1])
        y_train.append(item[-1])

    X_test = test_cancer[:, 1:-1]
    y_test = test_cancer[:, -1]

    return np.array(X_train), np.array(X_test), np.array(y_train), np.array(y_test)


def loadIris_(valid_idx=None):
    if valid_idx is None:
        valid_idx = []

    train_cancer = np.array([list(i) for i in models.TrainIris.objects.all().values_list()])
    test_cancer = np.array([list(i) for i in models.TestIris.objects.all().values_list()])

    X_train = []
    y_train = []
    idx = 0
    for item in train_cancer:
        if idx not in valid_idx:
            idx += 1
            continue
        idx += 1
        X_train.append(item[1:-1])
        y_train.append(item[-1])

    X_test = test_cancer[:, 1:-1]
    y_test = test_cancer[:, -1]

    return np.array(X_train), np.array(X_test), np.array(y_train), np.array(y_test)


def align(lst1, lst2):
    dic1 = {}
    for i in range(len(lst1)):
        dic1[i] = lst1[i]

    sorted_dic1 = sorted(dic1.items(), key=lambda x: x[1], reverse=True)
    idx = []
    for sv in sorted_dic1:
        idx.append(sv[0])

    lst1 = np.array(lst1)
    lst1 = lst1[idx]

    lst2 = np.array(lst2)
    lst2 = lst2[idx]
    return lst1, lst2
