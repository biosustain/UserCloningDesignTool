from rest_framework import serializers
from ..models import Project

from parts_library.serializers import PartHandlerSerializer
from .AmuserCloning import AmuserCloningSerializer, amuser_cloning_reference


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
        validated_data['amusercloning'] = amuser_cloning_reference(
            ref, amusercloning)

        # Update all project fields
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        _handler = PartHandlerSerializer()

        _handler.update(instance=instance.parthandler, validated_data=parts)

        return instance
