# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-13 14:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parts_library', '0004_auto_20171013_1122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iceuserprofile',
            name='ice_token',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]