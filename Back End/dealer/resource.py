from import_export import resources
from dealer.models import *


class TrainCancerResource(resources.ModelResource):
    class Meta:
        model = TrainCancer


class TestCancerResource(resources.ModelResource):
    class Meta:
        model = TestCancer


class TrainChessResource(resources.ModelResource):
    class Meta:
        model = TrainChess


class TestChessResource(resources.ModelResource):
    class Meta:
        model = TestChess


class SurveyInfoResource(resources.ModelResource):
    class Meta:
        model = SurveyInfo


class ShapleyInfoResource(resources.ModelResource):
    class Meta:
        model = ShapleyInfo


class ModelInfoResource(resources.ModelResource):
    class Meta:
        model = ModelInfo


class TrainIrisResource(resources.ModelResource):
    class Meta:
        model = TrainIris


class TestIrisResource(resources.ModelResource):
    class Meta:
        model = TestIris
