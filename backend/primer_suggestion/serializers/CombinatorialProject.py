from rest_framework import serializers
from ..models import CombinatorialProject

from .AmuserCloning import AmuserCloningSerializer, amuser_cloning_reference
from .Project import ProjectSerializer

import copy
import itertools


class CombinatorialProjectSerializer(serializers.HyperlinkedModelSerializer):
    amusercloning = AmuserCloningSerializer()
    projects = ProjectSerializer(many=True, read_only=True)
    user = serializers.HiddenField(
       default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = CombinatorialProject
        fields = ['id', 'name', 'parts', 'amusercloning', 'projects', 'user']
        read_only_fields = ['projects', 'user']

    def create(self, validated_data):
        instance = CombinatorialProject()

        amusercloning = validated_data.pop('amusercloning')
        ref = ('combinatorial', instance)
        validated_data['amusercloning'] = amuser_cloning_reference(
            ref, amusercloning)

        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        # Make all combinations of the parts
        parts = copy.deepcopy(validated_data['parts'])
        part_combinations = list(itertools.product(*parts))

        project_serializer = ProjectSerializer(context={})

        for i, part_combo in enumerate(part_combinations):
            # Change to tuple to support item assignment
            part_combo = list(part_combo)
            # Set the order of the part
            for j, part in enumerate(part_combo):
                part['order'] = j
                part_combo[j] = part

            project_data = {
                'user': instance.user,
                'name': validated_data['name'] + '_' + str(i),
                'parthandler': {'parts': part_combo},
                'amusercloning': amusercloning,
                'combinatorial': instance
            }
            
            project_serializer.create(project_data)

        return instance

    def update(self, instance, validated_data):
        amusercloning = validated_data.pop('amusercloning')
        ref = ('combinatorial', instance)
        validated_data['amusercloning'] = amuser_cloning_reference(
            ref, amusercloning)

        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        # Make all combinations of the parts
        parts = copy.deepcopy(validated_data['parts'])
        part_combinations = list(itertools.product(*parts))

        project_serializer = ProjectSerializer()
        instance.projects.all().delete()

        for i, part_combo in enumerate(part_combinations):
            # Change to tuple to support item assignment
            part_combo = list(part_combo)

            # Set the order of the part
            for j, part in enumerate(part_combo):
                part['order'] = j
                part_combo[j] = part

            project_data = {
                'user': instance.user,
                'name': validated_data['name'] + '_' + str(i),
                'parthandler': {'parts': part_combo},
                'amusercloning': amusercloning,
                'combinatorial': instance
            }

            project_serializer.create(project_data)

        return instance
