from parts_library.models import Part, PartHandler
from parts_library.service import PartService

# This is for the REST API
from .serializers import PartHandlerSerializer, PartSerializer
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.views import APIView


class PartHandler(viewsets.ViewSetMixin, generics.ListCreateAPIView):
    serializer_class = PartHandlerSerializer
    queryset = PartHandler.objects.all()
    permission_classes = [permissions.AllowAny]


class IcePartApiList(APIView):
    serializer_class = PartSerializer
    queryset = Part.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kw):
        # Empty searches return a 500 error, so just get a list view to avoid
        # that exeption.
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        if 'search' in request.query_params:
            results = part_service.search_ice_part(
                request.query_params['search'])
        else:
            results = part_service.get_parts_list()

        new_results = []
        for result in results['results']:
            result = result['entryInfo']

            seq_and_feat = part_service.get_sequence_and_feats(result['id'])
            ret_result = {
                'ice_id': result['id'],
                'ice_name': result['partId'],
                'name': result['name'],
                'sequence': seq_and_feat.get('sequence', ''),
                'description': result.get('shortDescription', ''),
                'feats': seq_and_feat.get('features', ''),
                'errors': seq_and_feat.get('errors', [])
            }
            new_results.append(ret_result)

        results['results'] = new_results
        response = Response(results, status=status.HTTP_200_OK)
        return response


class PartApiDetail(viewsets.ViewSetMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PartSerializer
    queryset = Part.objects.all()
    permission_classes = [permissions.AllowAny]


class PartApiList(viewsets.ViewSetMixin, generics.ListCreateAPIView):
    serializer_class = PartSerializer
    queryset = Part.objects.all()
    permission_classes = [permissions.AllowAny]
