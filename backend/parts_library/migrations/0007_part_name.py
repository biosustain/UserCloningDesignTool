# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-27 08:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parts_library', '0006_auto_20171023_1045'),
    ]

    operations = [
        migrations.AddField(
            model_name='part',
            name='name',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]