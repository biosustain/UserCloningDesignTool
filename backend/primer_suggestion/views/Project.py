from wsgiref.util import FileWrapper
from django.http import HttpResponse

from ..models import Project
from ..serializers import ProjectSerializer
from .Pagination import NotPaginatedSetPagination

from parts_library.service import PartService

from ..utils.user_report_generator import UserCloningReportGenerator
from ..utils.update_view_with_parsed_results import UpdateSerializedDataWithResult
from ..utils.genbank_file_generator import GenbankFileGenerator
from ..utils import user_permission, report_to_csv

from rest_framework import generics, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route

from rest_framework_csv import renderers as r

import json


@user_permission
class ProjectApiList(viewsets.ViewSetMixin, generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    # Search functionality
    pagination_class = NotPaginatedSetPagination
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name', ]

    def create(self, request, *args, **kw):
        print('creating new project')
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        res = super(ProjectApiList, self).create(request, *args, **kw)
        project = Project.objects.get(pk=res.data['id'])
        ice_res = part_service.post_project_to_ice(project)
        return res

    def list(self, request, *args, **kw):
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        queryset = self.get_queryset()
        if len(queryset) == 0:
            return Response({
                'count': 0,
                'results': []
            })

        page = self.paginate_queryset(queryset)
        serializer = ProjectSerializer(page, many=True)

        # Get the user reports
        generator = UserCloningReportGenerator(queryset, part_service)
        report_dict = generator.generate_dict_of_parsed_reports()
        updated_data = UpdateSerializedDataWithResult(
            report_dict, serializer.data, 'project').get_updated_data()
        res = self.get_paginated_response(data=updated_data)
        return res

    @list_route(methods=['GET'], renderer_classes=[r.CSVRenderer], url_path='csv')
    def get_csv_report_file(self, request):
        '''Takes a list of project ids and returns a csv file
        with their reports'''
        # TODO: move the functionality to a serializer
        data = request.query_params
        if 'project' in data:
            part_service = PartService(request.user.iceuserprofile.ice_comm)
            idx_list = json.loads(data.get('project'))
            print(idx_list)
            queryset = Project.objects.filter(
                pk__in=idx_list)
            generator = UserCloningReportGenerator(queryset, part_service)
            report_dict = generator.generate_dict_of_parsed_reports()
            content = report_to_csv(report_dict)
        else:
            # TODO go to 404 page instead of download file
            return Response({'status_code': 400,
                             'Content-Type': 'application/json'})
        return Response(content)

    @detail_route(methods=['GET'], url_path='genbank')
    def get_genbank_file(self, request, pk=None):
        project = self.get_object()
        ice_service = PartService(request.user.iceuserprofile.ice_comm)
        generator = GenbankFileGenerator(project, ice_service)
        genbank_file = generator.get_genbank_file()
        resp = HttpResponse(FileWrapper(genbank_file),
                            content_type='application/genbank')
        resp['Content-Disposition'] = f'attachment; filename={project.name}.gb'
        return resp


@user_permission
class ProjectApiDetail(viewsets.ViewSetMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def retrieve(self, request, pk=None):
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        instance = self.get_object()
        parts = instance.part_ice_id_list
        serializer = self.get_serializer(instance)

        # Get the user reports
        generator = UserCloningReportGenerator(instance, part_service)
        report_dict = generator.generate_dict_of_parsed_reports()

        updated_data = UpdateSerializedDataWithResult(
            report_dict, serializer.data, 'project').get_updated_data()

        return Response(updated_data)

    def update(self, request, *args, **kwargs):
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        instance = self.get_object()
        parts = instance.part_ice_id_list
        partial = kwargs.pop('partial', False)

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        # Get the user reports
        generator = UserCloningReportGenerator(instance, part_service)
        report_dict = generator.generate_dict_of_parsed_reports()

        updated_data = UpdateSerializedDataWithResult(
            report_dict, serializer.data, 'project').get_updated_data()

        project = Project.objects.get(pk=updated_data['id'])
        ice_res = part_service.post_project_to_ice(project)
        return Response(updated_data)
