# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-07-13 10:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('primer_suggestion', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProjectBundle',
            new_name='CombinatorialProject',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='bundle',
            new_name='combinatorial',
        ),
    ]