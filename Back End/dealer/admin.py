from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from dealer.resource import *


# Register your models here.

@admin.register(TrainCancer)
class TrainCancerAdmin(ImportExportModelAdmin):
    resource_class = TrainCancerResource
    list_display = ['id', 'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean',
                    'compactness_mean', 'concavity_mean', 'concave_points_mean', 'symmetry_mean',
                    'fractal_dimension_mean', 'radius_se', 'texture_se', 'perimeter_se', 'area_se', 'smoothness_se',
                    'compactness_se', 'concavity_se', 'concave_points_se', 'symmetry_se', 'fractal_dimension_se',
                    'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst', 'smoothness_worst',
                    'compactness_worst', 'concavity_worst', 'concave_points_worst', 'symmetry_worst', 'diagnosis']


@admin.register(TestCancer)
class TestCancerAdmin(ImportExportModelAdmin):
    resource_class = TestCancerResource
    list_display = ['id', 'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean',
                    'compactness_mean', 'concavity_mean', 'concave_points_mean', 'symmetry_mean',
                    'fractal_dimension_mean', 'radius_se', 'texture_se', 'perimeter_se', 'area_se', 'smoothness_se',
                    'compactness_se', 'concavity_se', 'concave_points_se', 'symmetry_se', 'fractal_dimension_se',
                    'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst', 'smoothness_worst',
                    'compactness_worst', 'concavity_worst', 'concave_points_worst', 'symmetry_worst', 'diagnosis']


@admin.register(TrainChess)
class TrainChessAdmin(ImportExportModelAdmin):
    resource_class = TrainChessResource
    list_display = ['id', 'arr1', 'arr2', 'arr3', 'arr4', 'arr5', 'arr6', 'arr7', 'arr8', 'arr9', 'arr10', 'arr11',
                    'arr12', 'arr13', 'arr14', 'arr15', 'arr16', 'arr17', 'arr18', 'arr19', 'arr20', 'arr21', 'arr22',
                    'arr23', 'arr24', 'arr25', 'arr26', 'arr27', 'arr28', 'arr29', 'arr30', 'arr31', 'arr32', 'arr33',
                    'arr34', 'arr35', 'label']


@admin.register(TestChess)
class TestChessAdmin(ImportExportModelAdmin):
    resource_class = TestChessResource
    list_display = ['id', 'arr1', 'arr2', 'arr3', 'arr4', 'arr5', 'arr6', 'arr7', 'arr8', 'arr9', 'arr10', 'arr11',
                    'arr12', 'arr13', 'arr14', 'arr15', 'arr16', 'arr17', 'arr18', 'arr19', 'arr20', 'arr21', 'arr22',
                    'arr23', 'arr24', 'arr25', 'arr26', 'arr27', 'arr28', 'arr29', 'arr30', 'arr31', 'arr32', 'arr33',
                    'arr34', 'arr35', 'label']


@admin.register(SurveyInfo)
class SurveyInfoAdmin(ImportExportModelAdmin):
    resource_class = SurveyInfoResource
    list_display = ['eps', 'pri']


@admin.register(ShapleyInfo)
class ShapleyInfoAdmin(ImportExportModelAdmin):
    resource_class = ShapleyInfoResource
    list_display = ['id', 'shapley']


@admin.register(ModelInfo)
class ModelInfoAdmin(ImportExportModelAdmin):
    resource_class = ModelInfoResource
    list_display = ['id', 'dataset', 'epsilon', 'coverage', 'price', 'state']


@admin.register(TrainIris)
class TrainIrisAdmin(ImportExportModelAdmin):
    resource_class = TrainIrisResource
    list_display = ['id', 'sepallength', 'sepalwidth', 'label']


@admin.register(TestIris)
class TestIrisAdmin(ImportExportModelAdmin):
    resource_class = TestIrisResource
    list_display = ['id', 'sepallength', 'sepalwidth', 'label']
