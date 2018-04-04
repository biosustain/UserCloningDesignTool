import pytest

from primer_suggestion.utils import UserCloningReportGenerator

from .factories.primer_suggestion_factories import ProjectFactory, CombinatorialProjectFactory
from .dependencies.create_gb import get_gb_object

from primer_suggestion.models import Project, CombinatorialProject


@pytest.mark.django_db
class TestDetermineQueryType():
    def test_query_type_with_single_project(self, client):
        project = ProjectFactory()
        query = Project.objects.get(pk=project.id)
        generator = UserCloningReportGenerator(query)
        query_type = generator.determine_query_type()

        expected_result = ('project', 'single')

        assert query_type == expected_result
        assert generator.query_type == expected_result

    def test_query_type_with_multiple_projects(self, client):
        ProjectFactory()
        ProjectFactory()
        query = Project.objects.all()
        generator = UserCloningReportGenerator(query)
        query_type = generator.determine_query_type()

        expected_result = ('project', 'query_set')

        assert query_type == expected_result
        assert generator.query_type == expected_result

    def test_query_type_with_single_combinatorial_project(self, client):
        combinatorial = CombinatorialProjectFactory()
        query = CombinatorialProject.objects.get(pk=combinatorial.id)
        generator = UserCloningReportGenerator(query)
        query_type = generator.determine_query_type()

        expected_result = ('combinatorial', 'single')

        assert query_type == expected_result
        assert generator.query_type == expected_result

    def test_query_type_with_multiple_combinatorial_projects(self, client):
        CombinatorialProjectFactory()
        CombinatorialProjectFactory()
        query = CombinatorialProject.objects.all()
        generator = UserCloningReportGenerator(query)
        query_type = generator.determine_query_type()

        expected_result = ('combinatorial', 'query_set')

        assert query_type == expected_result
        assert generator.query_type == expected_result

    def test_unknown_type_raises_exception(self, client):
        query = []

        with pytest.raises(TypeError):
            generator = UserCloningReportGenerator(query)
            query_type = generator.determine_query_type()


@pytest.mark.django_db
class TestGettingIceIds():
    def test_get_ice_ids_with_single_project(self, client):
        project = ProjectFactory()
        query = Project.objects.get(pk=project.id)
        generator = UserCloningReportGenerator(query)
        ice_id_list = generator.get_ice_ids_from_query()

        assert len(ice_id_list) == 2

    def test_get_ice_ids_with_multiple_projects(self, client):
        ProjectFactory()
        ProjectFactory()
        query = Project.objects.all()
        generator = UserCloningReportGenerator(query)
        ice_id_list = generator.get_ice_ids_from_query()

        assert len(ice_id_list) == 4

    def test_get_ice_ids_with_single_combinatorial_project(self, client):
        combinatorial = CombinatorialProjectFactory()
        query = CombinatorialProject.objects.get(pk=combinatorial.id)
        generator = UserCloningReportGenerator(query)
        ice_id_list = generator.get_ice_ids_from_query()

        assert len(ice_id_list) == 4

    def test_get_ice_ids_with_multiple_combinatorial_projects(self, client):
        CombinatorialProjectFactory()
        CombinatorialProjectFactory()
        query = CombinatorialProject.objects.all()
        generator = UserCloningReportGenerator(query)
        ice_id_list = generator.get_ice_ids_from_query()

        assert len(ice_id_list) == 8


@pytest.mark.django_db
class TestServiceMethods():
    def test_return_genbank_dict(self, client):
        from parts_library.service import PartService
        from .decorators import FakeIceComm
        ProjectFactory()
        query = Project.objects.all()
        fake_ice_comm = FakeIceComm({})
        service = PartService(fake_ice_comm)
        generator = UserCloningReportGenerator(query, service)
        gb_list = generator.query_service_for_parts()
        assert len(gb_list) == 1

    def test_throw_exception_when_service_not_set(self):
        ProjectFactory()
        query = Project.objects.all()
        generator = UserCloningReportGenerator(query)
        with pytest.raises(AttributeError):
            generator.query_service_for_parts()


@pytest.mark.django_db
class TestProjectListAndSettingsGeneration():
    def test_create_list_of_single_project(self, client):
        project = ProjectFactory()
        query = Project.objects.get(pk=project.id)
        generator = UserCloningReportGenerator(query)
        projects = generator.create_list_of_projects_from_query()

        assert len(projects) == 1
        assert projects[0] == project

    def test_create_list_of_multiple_projects(self, client):
        ProjectFactory()
        ProjectFactory()
        query = Project.objects.all()
        generator = UserCloningReportGenerator(query)
        projects = generator.create_list_of_projects_from_query()

        assert len(projects) == 2

    def test_create_list_of_single_combinatorial_project(self, client):
        combinatorial = CombinatorialProjectFactory()
        query = CombinatorialProject.objects.get(pk=combinatorial.id)
        generator = UserCloningReportGenerator(query)
        projects = generator.create_list_of_projects_from_query()

        assert len(projects) == 2

    def test_create_list_of_multiple_combinatorial_projects(self, client):
        CombinatorialProjectFactory()
        CombinatorialProjectFactory()
        query = CombinatorialProject.objects.all()
        generator = UserCloningReportGenerator(query)
        projects = generator.create_list_of_projects_from_query()

        assert len(projects) == 4

    def test_create_biopy_list(self, client):
        pass


@pytest.mark.django_db
class TestReportGeneration():
    def test_generate_single_report(self, client):
        project = ProjectFactory()
        query = Project.objects.get(pk=project.id)
        gb = get_gb_object()
        genbank_dict = {
            gb.name: gb
        }
        generator = UserCloningReportGenerator(query)

        generator.genbank_dict = genbank_dict
        report = generator.generate_single_report(project)
        assert len(report['report']) > 0
        assert 'errors' in report
        assert 'report' in report

    def test_generate_parsed_reports_for_multiple_projects(self, client):
        projects = [ProjectFactory(), ProjectFactory()]
        query = Project.objects.all()
        gb = get_gb_object()
        genbank_dict = {
            gb.name: gb
        }
        generator = UserCloningReportGenerator(query)

        generator.genbank_dict = genbank_dict
        report = generator.generate_dict_of_parsed_reports()
        assert len(report) == 2
        assert projects[0].name in report.keys()
        assert projects[1].name in report.keys()

    def test_generate_parsed_reports_for_single_combinatorial_project(self, client):
        combinatorial = CombinatorialProjectFactory()
        query = CombinatorialProject.objects.get(pk=combinatorial.id)
        gb = get_gb_object()
        genbank_dict = {
            gb.name: gb
        }
        generator = UserCloningReportGenerator(query)
        generator.genbank_dict = genbank_dict
        project_list = generator.create_list_of_projects_from_query()
        report = generator.generate_dict_of_parsed_reports()
        assert len(report) == 2

    def test_generate_parsed_reports_for_multiple_combinatorial_projects(self, client):
        CombinatorialProjectFactory()
        CombinatorialProjectFactory()
        query = CombinatorialProject.objects.all()
        gb = get_gb_object()
        genbank_dict = {
            gb.name: gb
        }
        generator = UserCloningReportGenerator(query)

        generator.genbank_dict = genbank_dict
        project_list = generator.create_list_of_projects_from_query()
        report = generator.generate_dict_of_parsed_reports()
        assert len(report) == 4
