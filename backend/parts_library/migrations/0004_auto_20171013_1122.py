# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-13 11:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parts_library', '0003_auto_20171011_1335'),
    ]

    operations = [
        migrations.AddField(
            model_name='iceuserprofile',
            name='ice_host',
            field=models.CharField(default='dhcp-10-75-3-178', max_length=50),
        ),
        migrations.AddField(
            model_name='iceuserprofile',
            name='ice_port',
            field=models.IntegerField(default=443),
        ),
    ]