# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-07-13 10:33
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('primer_suggestion', '0002_auto_20170713_1033'),
    ]

    operations = [
        migrations.AddField(
            model_name='combinatorialproject',
            name='parts',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
    ]