from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from wsgiref.util import FileWrapper

from ..models import CombinatorialProject, Project
from ..serializers import CombinatorialProjectSerializer

from parts_library.service import PartService

from ..utils.user_report_generator import UserCloningReportGenerator
from ..utils.update_view_with_parsed_results import UpdateSerializedDataWithResult
from ..utils.genbank_file_generator import GenbankFileGenerator
from ..utils import user_permission, report_to_csv

from rest_framework import generics, viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route

from rest_framework_csv import renderers as r
from io import BytesIO
import zipfile


@user_permission
class CombinatorialProjectApiList(viewsets.ViewSetMixin, generics.ListCreateAPIView):
    queryset = CombinatorialProject.objects.all()
    serializer_class = CombinatorialProjectSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ['name', ]

    def create(self, request, *args, **kw):
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        res = super().create(request, *args, **kw)
        for project in res.data['projects']:
            project = Project.objects.get(pk=project['id'])
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
        parts = list(set([part.ice_id for combinatorial in queryset
                          for projects in combinatorial.projects.all()
                          for part in projects.part_list]))
        page = self.get_queryset()
        serializer = CombinatorialProjectSerializer(page, many=True)

        # Get the user reports
        generator = UserCloningReportGenerator(queryset, part_service)
        report_dict = generator.generate_dict_of_parsed_reports()
        updated_data = UpdateSerializedDataWithResult(
            report_dict, serializer.data, 'combinatorial').get_updated_data()
        res = Response({
                'count': len(updated_data),
                'results': updated_data
            })
        return res

    @detail_route(methods=['GET'], renderer_classes=[r.CSVRenderer], url_path='csv')
    def get_csv_report_file(self, request, pk=None):
        '''Download all the projects created as csv'''
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        combinatorial = self.get_object()
        generator = UserCloningReportGenerator(combinatorial, part_service)
        report_dict = generator.generate_dict_of_parsed_reports()
        content = report_to_csv(report_dict)

        return Response(content)

    @detail_route(methods=['GET'], url_path='genbank')
    def get_genbank_files(self, request, pk=None):
        combinatorial = self.get_object()
        ice_service = PartService(request.user.iceuserprofile.ice_comm)
        zip_io = BytesIO()
        with zipfile.ZipFile(zip_io, 'w') as f:
            for project in combinatorial.projects.all():
                generator = GenbankFileGenerator(project, ice_service)
                genbank_file = generator.get_genbank_file()

                f.write(genbank_file.name)
        resp = HttpResponse(zip_io.getvalue(),
                            content_type='application/x-zip-compressed')
        resp['Content-Disposition'] = f'attachment; filename={combinatorial.name}.zip'
        resp['Content-Length'] = zip_io.tell()
        return resp


class CombinatorialProjectApiDetail(viewsets.ViewSetMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = CombinatorialProject.objects.all()
    serializer_class = CombinatorialProjectSerializer

    def retrieve(self, request, pk=None):
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        instance = self.get_object()
        parts = list(set([part.ice_id
                          for projects in instance.projects.all()
                          for part in projects.part_list]))
        serializer = CombinatorialProjectSerializer(instance)

        # Get the user reports
        generator = UserCloningReportGenerator(instance, part_service)
        report_dict = generator.generate_dict_of_parsed_reports()

        updated_data = UpdateSerializedDataWithResult(
            report_dict, serializer.data, 'combinatorial').get_updated_data()

        return Response(updated_data)

    def update(self, request, *args, **kwargs):
        part_service = PartService(request.user.iceuserprofile.ice_comm)
        instance = self.get_object()
        parts = list(set([part.ice_id
                          for projects in instance.projects.all()
                          for part in projects.part_list]))
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
            report_dict, serializer.data, 'combinatorial').get_updated_data()

        return Response(updated_data)
