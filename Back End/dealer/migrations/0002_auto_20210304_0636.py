# Generated by Django 3.1.7 on 2021-03-04 06:36

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('dealer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BreastCancer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False)),
                ('diagnosis', models.FloatField()),
                ('radius_mean', models.FloatField()),
                ('texture_mean', models.FloatField()),
                ('perimeter_mean', models.FloatField()),
                ('area_mean', models.FloatField()),
                ('smoothness_mean', models.FloatField()),
                ('compactness_mean', models.FloatField()),
                ('concavity_mean', models.FloatField()),
                ('concave_points_mean', models.FloatField()),
                ('symmetry_mean', models.FloatField()),
                ('fractal_dimension_mean', models.FloatField()),
                ('radius_se', models.FloatField()),
                ('texture_se', models.FloatField()),
                ('perimeter_se', models.FloatField()),
                ('area_se', models.FloatField()),
                ('smoothness_se', models.FloatField()),
                ('compactness_se', models.FloatField()),
                ('concavity_se', models.FloatField()),
                ('concave_points_se', models.FloatField()),
                ('symmetry_se', models.FloatField()),
                ('fractal_dimension_se', models.FloatField()),
                ('radius_worst', models.FloatField()),
                ('texture_worst', models.FloatField()),
                ('perimeter_worst', models.FloatField()),
                ('area_worst', models.FloatField()),
                ('smoothness_worst', models.FloatField()),
                ('compactness_worst', models.FloatField()),
                ('concavity_worst', models.FloatField()),
                ('concave_points_worst', models.FloatField()),
                ('symmetry_worst', models.FloatField()),
                ('fractal_dimension_worst', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='Article',
        ),
    ]
