from django.db import models


# Create your models here.
class TrainCancer(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    radius_mean = models.FloatField(null=False)
    texture_mean = models.FloatField(null=False)
    perimeter_mean = models.FloatField(null=False)
    area_mean = models.FloatField(null=False)
    smoothness_mean = models.FloatField(null=False)
    compactness_mean = models.FloatField(null=False)
    concavity_mean = models.FloatField(null=False)
    concave_points_mean = models.FloatField(null=False)
    symmetry_mean = models.FloatField(null=False)
    fractal_dimension_mean = models.FloatField(null=False)
    radius_se = models.FloatField(null=False)
    texture_se = models.FloatField(null=False)
    perimeter_se = models.FloatField(null=False)
    area_se = models.FloatField(null=False)
    smoothness_se = models.FloatField(null=False)
    compactness_se = models.FloatField(null=False)
    concavity_se = models.FloatField(null=False)
    concave_points_se = models.FloatField(null=False)
    symmetry_se = models.FloatField(null=False)
    fractal_dimension_se = models.FloatField(null=False)
    radius_worst = models.FloatField(null=False)
    texture_worst = models.FloatField(null=False)
    perimeter_worst = models.FloatField(null=False)
    area_worst = models.FloatField(null=False)
    smoothness_worst = models.FloatField(null=False)
    compactness_worst = models.FloatField(null=False)
    concavity_worst = models.FloatField(null=False)
    concave_points_worst = models.FloatField(null=False)
    symmetry_worst = models.FloatField(null=False)
    diagnosis = models.IntegerField(null=False)


class TestCancer(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    radius_mean = models.FloatField(null=False)
    texture_mean = models.FloatField(null=False)
    perimeter_mean = models.FloatField(null=False)
    area_mean = models.FloatField(null=False)
    smoothness_mean = models.FloatField(null=False)
    compactness_mean = models.FloatField(null=False)
    concavity_mean = models.FloatField(null=False)
    concave_points_mean = models.FloatField(null=False)
    symmetry_mean = models.FloatField(null=False)
    fractal_dimension_mean = models.FloatField(null=False)
    radius_se = models.FloatField(null=False)
    texture_se = models.FloatField(null=False)
    perimeter_se = models.FloatField(null=False)
    area_se = models.FloatField(null=False)
    smoothness_se = models.FloatField(null=False)
    compactness_se = models.FloatField(null=False)
    concavity_se = models.FloatField(null=False)
    concave_points_se = models.FloatField(null=False)
    symmetry_se = models.FloatField(null=False)
    fractal_dimension_se = models.FloatField(null=False)
    radius_worst = models.FloatField(null=False)
    texture_worst = models.FloatField(null=False)
    perimeter_worst = models.FloatField(null=False)
    area_worst = models.FloatField(null=False)
    smoothness_worst = models.FloatField(null=False)
    compactness_worst = models.FloatField(null=False)
    concavity_worst = models.FloatField(null=False)
    concave_points_worst = models.FloatField(null=False)
    symmetry_worst = models.FloatField(null=False)
    diagnosis = models.IntegerField(null=False)


class TrainChess(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    arr1 = models.IntegerField(null=False)
    arr2 = models.IntegerField(null=False)
    arr3 = models.IntegerField(null=False)
    arr4 = models.IntegerField(null=False)
    arr5 = models.IntegerField(null=False)
    arr6 = models.IntegerField(null=False)
    arr7 = models.IntegerField(null=False)
    arr8 = models.IntegerField(null=False)
    arr9 = models.IntegerField(null=False)
    arr10 = models.IntegerField(null=False)
    arr11 = models.IntegerField(null=False)
    arr12 = models.IntegerField(null=False)
    arr13 = models.IntegerField(null=False)
    arr14 = models.IntegerField(null=False)
    arr15 = models.IntegerField(null=False)
    arr16 = models.IntegerField(null=False)
    arr17 = models.IntegerField(null=False)
    arr18 = models.IntegerField(null=False)
    arr19 = models.IntegerField(null=False)
    arr20 = models.IntegerField(null=False)
    arr21 = models.IntegerField(null=False)
    arr22 = models.IntegerField(null=False)
    arr23 = models.IntegerField(null=False)
    arr24 = models.IntegerField(null=False)
    arr25 = models.IntegerField(null=False)
    arr26 = models.IntegerField(null=False)
    arr27 = models.IntegerField(null=False)
    arr28 = models.IntegerField(null=False)
    arr29 = models.IntegerField(null=False)
    arr30 = models.IntegerField(null=False)
    arr31 = models.IntegerField(null=False)
    arr32 = models.IntegerField(null=False)
    arr33 = models.IntegerField(null=False)
    arr34 = models.IntegerField(null=False)
    arr35 = models.IntegerField(null=False)
    label = models.IntegerField(null=False)


class TestChess(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    arr1 = models.IntegerField(null=False)
    arr2 = models.IntegerField(null=False)
    arr3 = models.IntegerField(null=False)
    arr4 = models.IntegerField(null=False)
    arr5 = models.IntegerField(null=False)
    arr6 = models.IntegerField(null=False)
    arr7 = models.IntegerField(null=False)
    arr8 = models.IntegerField(null=False)
    arr9 = models.IntegerField(null=False)
    arr10 = models.IntegerField(null=False)
    arr11 = models.IntegerField(null=False)
    arr12 = models.IntegerField(null=False)
    arr13 = models.IntegerField(null=False)
    arr14 = models.IntegerField(null=False)
    arr15 = models.IntegerField(null=False)
    arr16 = models.IntegerField(null=False)
    arr17 = models.IntegerField(null=False)
    arr18 = models.IntegerField(null=False)
    arr19 = models.IntegerField(null=False)
    arr20 = models.IntegerField(null=False)
    arr21 = models.IntegerField(null=False)
    arr22 = models.IntegerField(null=False)
    arr23 = models.IntegerField(null=False)
    arr24 = models.IntegerField(null=False)
    arr25 = models.IntegerField(null=False)
    arr26 = models.IntegerField(null=False)
    arr27 = models.IntegerField(null=False)
    arr28 = models.IntegerField(null=False)
    arr29 = models.IntegerField(null=False)
    arr30 = models.IntegerField(null=False)
    arr31 = models.IntegerField(null=False)
    arr32 = models.IntegerField(null=False)
    arr33 = models.IntegerField(null=False)
    arr34 = models.IntegerField(null=False)
    arr35 = models.IntegerField(null=False)
    label = models.IntegerField(null=False)


class SurveyInfo(models.Model):
    eps = models.FloatField(null=False)
    pri = models.FloatField(null=False)


class ShapleyInfo(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    shapley = models.FloatField(null=False)


class ModelInfo(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.CharField(null=False, max_length=256)
    coverage = models.FloatField(null=False)
    price = models.FloatField(null=False)
    epsilon = models.FloatField(null=False)
    state = models.IntegerField(null=False)


class TrainIris(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    sepallength = models.FloatField(null=False)
    sepalwidth = models.FloatField(null=False)
    label = models.IntegerField(null=False, default=1)


class TestIris(models.Model):
    id = models.IntegerField(null=False, primary_key=True)
    sepallength = models.FloatField(null=False)
    sepalwidth = models.FloatField(null=False)
    label = models.IntegerField(null=False, default=1)
