from rest_framework import serializers
from ..models import Casette


class CasetteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casette
        fields = ['id', 'name', 'description']
