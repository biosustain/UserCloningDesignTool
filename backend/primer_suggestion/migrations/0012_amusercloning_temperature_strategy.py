# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-08 13:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('primer_suggestion', '0011_auto_20171023_1045'),
    ]

    operations = [
        migrations.AddField(
            model_name='amusercloning',
            name='temperature_strategy',
            field=models.IntegerField(choices=[(0, 'none'), (1, 'eq'), (2, 'manual')], default=2),
        ),
    ]