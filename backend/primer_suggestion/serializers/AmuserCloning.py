from rest_framework import serializers
from ..models import AmuserCloning


class ChoicesField(serializers.Field):
    '''Used to serialize the temperature strategy'''

    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)


class AmuserCloningSerializer(serializers.HyperlinkedModelSerializer):
    temperature_option = ChoicesField(
        choices=AmuserCloning.STRATEGY)

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

# NOTE: This might be worthwhile to put inside the amusercloning serializer


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
