# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-25 10:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iceuserprofile',
            name='ice_host',
            field=models.CharField(default='10.75.3.178', max_length=50),
        ),
    ]
