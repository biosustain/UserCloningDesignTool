# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-07-18 09:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('primer_suggestion', '0006_auto_20170717_1347'),
    ]

    operations = [
        migrations.AddField(
            model_name='combinatorialproject',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='combinatorialproject',
            name='last_modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
