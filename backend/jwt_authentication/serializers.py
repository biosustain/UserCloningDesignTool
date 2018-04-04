from rest_framework import serializers
from .models import IceDatabase


class IceDatabaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IceDatabase
