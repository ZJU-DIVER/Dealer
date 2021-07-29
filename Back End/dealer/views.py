from django.forms import model_to_dict
from django.http import HttpResponse
from dealer import models
import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from dealer.utils import AMP, AMP_shapley, Shapley, Price, Gen_Shapley, Draw
import math


# Create your views here.


def http_response(success, data):
    res = {
        "success": success,
        "payload": data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type='application/json')


def query_cancer(request):
    data = serializers.serialize('python', models.TrainCancer.objects.all())
    return http_response(True, data)


def query_cancer_by_id(request):
    id_list = json.loads(request.body)["id"]
    data = []
    for id in id_list:
        data.append(serializers.serialize('python', models.TrainCancer.objects.filter(id=id)))
    return http_response(True, data)


def query_chess(request):
    data = serializers.serialize('python', models.TrainChess.objects.all())
    return http_response(True, data)


def query_chess_by_id(request):
    id_list = json.loads(request.body)["id"]
    data = []
    for id in id_list:
        data.append(serializers.serialize('python', models.TrainChess.objects.filter(id=id)))
    return http_response(True, data)


def query_iris(request):
    data = serializers.serialize('python', models.TrainIris.objects.all())
    return http_response(True, data)


def query_amp(request):
    dataset = json.loads(request.body)["dataset"]
    num_repeats = json.loads(request.body)["num_repeats"]
    epsilon = json.loads(request.body)["epsilon"]
    data = AMP.amp_main(dataset, epsilon, num_repeats)
    return http_response(True, data)


def query_amp_shapley(request):
    dataset = json.loads(request.body)["dataset"]
    num_repeats = json.loads(request.body)["num_repeats"]
    shapley_mode = json.loads(request.body)["shapley_mode"]
    epsilon = json.loads(request.body)["epsilon"]
    price = json.loads(request.body)["price"]
    budget = json.loads(request.body)["budget"]
    bp = json.loads(request.body)['bp']
    ps = json.loads(request.body)['ps']

    epsilon_ = sorted(epsilon)
    data = AMP_shapley.amp_shapley_main(dataset, shapley_mode, epsilon_, budget, bp, ps, num_repeats)

    for item in data:
        for i in range(len(epsilon)):
            if epsilon[i] == item['epsilon']:
                break
        item["price"] = price[i]
        id = models.ModelInfo.objects.all().count()
        obj = models.ModelInfo.objects.create(id=id, dataset=dataset, epsilon=item['epsilon'],
                                              coverage=item['coverage'],
                                              price=item['price'], state=0)

        item['id'] = obj.id

    return http_response(True, data)


def query_compensation(request):
    dataset = json.loads(request.body)["dataset"]
    idx = json.loads(request.body)["id"]
    bp = json.loads(request.body)["bp"]
    ps = json.loads(request.body)["ps"]
    eps = json.loads(request.body)["eps"]
    sample = json.loads(request.body)["sample"]

    acc, sv = Gen_Shapley.eval_monte_carlo(dataset, idx, sample)
    models.ShapleyInfo.objects.all().delete()
    price = dict()
    sv_label = []
    for key in sv.keys():
        models.ShapleyInfo.objects.create(id=key, shapley=sv[key])
        price[key] = bp * sv[key] / acc * pow(math.e, ps * eps)
        sv_label_ = [key, math.fabs(sv[key])]
        if dataset == 'cancer':
            res = models.TrainCancer.objects.get(id=key)
            res = model_to_dict(res)
            sv_label_.append(res['radius_mean'])
            sv_label_.append(res['texture_mean'])
            if sv[key] < 0:
                sv_label_.append('black')
            elif res['diagnosis'] == 0:
                sv_label_.append('green')
            else:
                sv_label_.append('blue')
        elif dataset == 'chess':
            res = models.TrainChess.objects.get(id=key)
            res = model_to_dict(res)
            sv_label_.append(res['arr1'])
            sv_label_.append(res['arr2'])
            if res['label'] == 0:
                sv_label_.append('green')
            else:
                sv_label_.append('blue')
        else:
            res = models.TrainIris.objects.get(id=key)
            res = model_to_dict(res)
            sv_label_.append(res['sepallength'])
            sv_label_.append(res['sepalwidth'])
            if res['label'] == 0:
                sv_label_.append('green')
            else:
                sv_label_.append('blue')
        sv_label_.append((math.fabs(sv[key]) / acc) * 500 * 2)
        sv_label.append(sv_label_)

    name = Draw.draw(sv_label)

    data = {
        "accuracy": acc,
        "sv": sv,
        "price": price,
        "name": name
    }

    return http_response(True, data)


def write_survey(request):
    survey = json.loads(request.body)['survey']
    models.SurveyInfo.objects.all().delete()
    for sur in survey:
        models.SurveyInfo.objects.create(eps=sur['eps'], pri=sur['pri'])

    survey_info = Price.get_survey_info()
    complete_price_space = Price.construct_complete_price_space(survey_info)
    max_revenue, price = Price.revenue_maximization(complete_price_space)

    data = {
        "complete_price_space": complete_price_space,
        "max_revenue": max_revenue,
        "price": price
    }

    return http_response(True, data)


def release_model(request):
    idx = json.loads(request.body)['id']
    models.ModelInfo.objects.filter(id=idx).update(state=1)
    data = serializers.serialize('python', models.ModelInfo.objects.all())

    return http_response(True, data)


def query_all_model(request):
    result = models.ModelInfo.objects.filter(state=1)

    model = []
    for res in result:
        model.append({
            'id': res.id,
            'coverage': res.coverage,
            'epsilon': res.epsilon,
            'price': res.price,
            "suggestion": True
        })

    return http_response(True, model)


def query_limited_model(request):
    dataset = json.loads(request.body)['dataset']
    budget = json.loads(request.body)['budget']
    covexp = json.loads(request.body)['covexp']
    covsen = json.loads(request.body)['covsen']
    noiexp = json.loads(request.body)['noiexp']
    noisen = json.loads(request.body)['noisen']

    model = models.ModelInfo.objects.filter(dataset=dataset, state=1)
    data = []
    for m in model:
        expprice = budget * (1 / (1 + math.pow(math.e, -1 * covsen * (m.coverage - covexp)))) * (
                1 / (1 + math.pow(math.e, -1 * noisen * (m.epsilon - noiexp))))
        if expprice >= m.price:
            res = {
                'id': m.id,
                'coverage': m.coverage,
                'epsilon': m.epsilon,
                'price': m.price,
                "suggestion": True
            }
        else:
            res = {
                'id': m.id,
                'coverage': m.coverage,
                'epsilon': m.epsilon,
                'price': m.price,
                "suggestion": False
            }
        data.append(res)

    return http_response(True, data)


def delete_all_model(request):
    models.ModelInfo.objects.all().delete()
    return http_response(True, [])
