# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-23 10:45
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parts_library', '0005_auto_20171013_1418'),
    ]

    operations = [
        migrations.DeleteModel(
            name='IceDatabase',
        ),
        migrations.RemoveField(
            model_name='iceuserprofile',
            name='user',
        ),
        migrations.DeleteModel(
            name='IceUserProfile',
        ),
    ]