# Generated by Django 3.1.7 on 2021-07-05 06:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dealer', '0013_shapleyinfo_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shapleyinfo',
            old_name='price',
            new_name='compensation',
        ),
    ]