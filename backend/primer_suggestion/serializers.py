from rest_framework import serializers
from primer_suggestion.models import AmuserCloning, Project, CombinatorialProject, Casette
from parts_library.serializers import PartHandlerSerializer

import copy
import itertools


def amuser_cloning_reference(reference, data):
    '''Since both projects and combinatorial projects uses the amuser cloning
    with a reference, this method abstracts away setting the reference and
    helps adhere to DRY principles

    Reference is a string saying either 'project' or 'combinatorial', to help
    identify which field should be updated or created
    '''
    serializer = AmuserCloningSerializer()
    data[reference[0]] = reference[1]
    # If the reference already has cloning update instead of create an instance
    if hasattr(reference[1], 'amusercloning'):
        instance = serializer.update(
            reference[1].amusercloning, validated_data=data)
    else:
        instance = serializer.create(validated_data=data)

    # Dictionaries are only copied by reference, so we need to remove the
    # combinatorial project from it, since it will give problems when using
    # the settings for creating projects
    instance.save()
    data.pop(reference[0])
    return instance


class ChoicesField(serializers.Field):
    '''Used to serialize the temperature strategy'''

    def __init__(self, choices, **kwargs):
        self._choices = {val: key for val, key in choices}
        self._rchoices = {key: val for val, key in choices}
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return self._rchoices[data]


class AmuserCloningSerializer(serializers.HyperlinkedModelSerializer):
    temperature_option = ChoicesField(choices=AmuserCloning.STRATEGY)

    class Meta:
        model = AmuserCloning
        fields = ['temperature_option',
                  'melting_temperature',
                  'sodium_concentration',
                  'primer_concentration',
                  'circular_input',
                  'circular_output']

    def to_internal_value(self, data):
        print("amuser before", data)
        ret = super().to_internal_value(data)
        print("amuser after", data)
        return ret


# TODO: See if this could be done with a regular serializer inheritance
# since the only thing a modelserializer does is implement create and update
class ProjectSerializer(serializers.ModelSerializer):
    parts = PartHandlerSerializer(source='parthandler')
    amusercloning = AmuserCloningSerializer()
    user = serializers.HiddenField(
       default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Project
        fields = ['id', 'ice_id', 'name', 'parts',
                  'amusercloning', 'description', 'user']
        read_only_fields = ['id', 'report', 'user']

    def create(self, validated_data):
        instance = Project()
        parthandler = validated_data.pop('parthandler')

        amusercloning = validated_data.pop('amusercloning')
        ref = ('project', instance)
        validated_data['amusercloning'] = amuser_cloning_reference(
            ref, amusercloning)

        # Update all project fields
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        parthandler['_project'] = instance
        _handler = PartHandlerSerializer().create(
            validated_data=parthandler)

        instance.save()
        return instance

    def update(self, instance, validated_data):
        parts = validated_data.pop('parthandler')

        amusercloning = validated_data.pop('amusercloning')
        ref = ('project', instance)
        validated_data['amusercloning'] = amuser_cloning_reference(ref, amusercloning)

        # Update all project fields
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        _handler = PartHandlerSerializer()

        _handler.update(instance=instance.parthandler, validated_data=parts)

        return instance


class CasetteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casette
        fields = ['id', 'name', 'description']


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
