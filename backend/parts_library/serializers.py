from rest_framework import serializers
from .models import Part, PartHandler


class PartSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ModelField(required=False,
                                model_field=Part()._meta.get_field('id'))

    class Meta:
        model = Part
        fields = ['id', 'name', 'ice_id', 'ice_name', 'order', 'fwd_strand']
        read_only_fields = ['feats']


class PartHandlerSerializer(serializers.ModelSerializer):
    # parts = PartSerializer(many=True)

    class Meta:
        model = PartHandler
        fields = ['parts']

    def to_representation(self, instance):
        '''Flatten the part dictionary'''
        p_serializer = PartSerializer(instance.part_list,
                                      context=self.context, many=True)
        p_ret = p_serializer.to_representation(instance.part_list)

        return p_ret

    def to_internal_value(self, value):
        '''Since the input is a list of parts, the PartSerializer is needed'''
        p_serializer = PartSerializer(value,
                                      context=self.context, many=True)
        p_ret = p_serializer.to_internal_value(value)
        ret = {'parts': p_ret}
        return ret

    def run_validation(self, initial_data):
        return super().run_validation(initial_data)

    def create(self, validated_data):
        instance = PartHandler(_project=validated_data['_project'])
        instance.save()
        for part in validated_data['parts']:
            partDb = Part(ice_id=part['ice_id'],
                          name=part['name'],
                          ice_name=part['ice_name'],
                          order=part['order'], _handler=instance)
            partDb.save()

        return instance

    def update(self, instance, validated_data):
        # Delete parts not in the validated data
        del_list = [x['id'] for x in validated_data['parts'] if 'id' in x]
        # Excludes all parts in the validated data that have an id, so they are
        # kept
        instance.parts.exclude(id__in=del_list).delete()

        for part in validated_data['parts']:
            if 'id' in part:
                partDb = Part.objects.get(pk=part['id'])
                PartSerializer().update(partDb, part)
            else:
                partDb = Part(ice_id=part['ice_id'],
                              ice_name=part['ice_name'],
                              name=part['name'],
                              order=part['order'], _handler=instance)
                partDb.save()

        return instance
