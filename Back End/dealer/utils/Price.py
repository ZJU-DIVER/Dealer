import numpy as np
from dealer import models


def get_survey_info():
    return [list(i)[1:] for i in models.SurveyInfo.objects.all().values_list()]


def construct_complete_price_space(survey_info):
    survey_info = sorted(survey_info)
    all_survey_info = []

    for i in range(len(survey_info)):
        if survey_info[i] not in all_survey_info:
            all_survey_info.append(survey_info[i])
        for j in range(i + 1, len(survey_info)):
            tmp = [survey_info[j][0], survey_info[i][1] / survey_info[i][0] * survey_info[j][0]]
            if tmp not in all_survey_info:
                all_survey_info.append(tmp)
        for t in range(i):
            tmp = [survey_info[t][0], survey_info[i][1]]
            if tmp not in all_survey_info:
                all_survey_info.append(tmp)

    all_survey_info = sorted(all_survey_info)

    return all_survey_info


def f(eps, pri):
    survey_points = get_survey_info()
    for sp in survey_points:
        if sp[0] == eps and sp[1] == pri:
            return 1

    return 0


def revenue_maximization(complete_price_space):
    complete_price_space = sorted(complete_price_space, reverse=True)

    length = 0
    models = []
    model = []
    eps = complete_price_space[0][0]
    for cps in complete_price_space:
        if cps[0] != eps:
            eps = cps[0]
            models.append(model)
            if len(model) > length:
                length = len(model)
            model = []
        model.append(cps)
    models.append(model)

    models = sorted(models)
    for i in range(len(models)):
        models[i] = sorted(models[i])

    MR = np.zeros((len(models), length))
    for i in range(len(models)):
        mk = models[i]
        MR[i][len(mk) - 1] = mk[-1][1] * f(mk[-1][0], mk[-1][1])
        for j in range(len(mk) - 2, -1, -1):
            ff = 0
            for k in range(j, len(mk)):
                ff += f(mk[k][0], mk[k][1])
            MR[i][j] = mk[j][1] * ff

    MAX = np.zeros((len(models), length))
    for i in range(len(models[0])):
        MAX[0][i] = MR[0][i]

    for i in range(1, len(models)):
        for j in range(len(models[i])):
            tmp = []
            idx = 0
            for t in models[i - 1]:
                if t[1] <= models[i][j][1] and t[1] / t[0] >= models[i][j][1] / models[i][j][0]:
                    tmp.append(MAX[i - 1][idx])
                idx = idx + 1

            MAX[i][j] = max(tmp) + MR[i][j]

    price = []
    for i in range(len(MAX)):
        idx = 0
        for j in range(len(MAX[i])):
            if MAX[i][j] >= MAX[i][idx]:
                idx = j
        price.append(models[i][idx])

    max_revenue = []
    for m in MAX:
        max_revenue.append(list(m))

    return max_revenue, price
