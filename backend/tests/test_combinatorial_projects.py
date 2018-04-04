import pytest

import json

import factory
from django.contrib.auth.signals import user_logged_in

from .factories.primer_suggestion_factories import AmuserCloningFactory, ProjectFactory, CombinatorialProjectFactory
from .factories.authentication_factories import UserFactory
from .decorators.module import patch_class_with_mock, mock_get_multiple_biopy_objects_with_client, mock_ice_post_to_ice_with_client, mock_get_biopy_with_client

from rest_framework import status


@pytest.mark.django_db
class TestCombinatorialProject():
    def get_two_parts(self):
        parts = [
            {
                'fwd_strand': False,
                'name': "crtI_WT",
                'order': 0,
                'ice_id': 1,
                'ice_name': 'CRURPS14'
            },
            {
                'fwd_strand': True,
                'name': "crtYB_WT",
                'order': 1,
                'ice_id': 1,
                'ice_name': 'CRURPS14'
            }
        ]

        return parts

    def get_settings(self):
        settings = {
            'temperature_option': 'manual',
            'circular_output': False,
            'melting_temperature': 45,
            'primer_concentration': 0.7,
            'sodium_concentration': 51
        }

        return settings

    def get_combinatorial_dict(self):
        res = {
            'name': 'new_combi',
            'parts': [
                self.get_two_parts(),
                self.get_two_parts()
            ],
            'amusercloning': self.get_settings()
        }
        return res

    @factory.django.mute_signals(user_logged_in)
    def test_part_combination(self):
        pass

    @factory.django.mute_signals(user_logged_in)
    def test_projects_are_deleted_on_change(self):
        pass

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_list_view(self, client):
        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)

        url = '/rest/api/combinatorial/'

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        results = resp_obj['results']

        assert 'projects' in results[0]
        assert len(results) == 1
        assert len(results[0]['projects']) == 2

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_detail_view(self, client):
        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)

        url = '/rest/api/combinatorial/' + str(combinatorial.id) + '/'

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')
        results = json.loads(response.content.decode())

        assert len(results['projects']) == 2

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_post(self, client):
        user_a = UserFactory()

        url = '/rest/api/combinatorial/'

        data = self.get_combinatorial_dict()

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        assert len(resp_obj['parts']) == 2
        assert 'order' in resp_obj['parts'][0][0]
        assert 'non_field_errors' not in resp_obj
        assert 'projects' in resp_obj
        assert resp_obj['name'] == "new_combi"
        assert response.status_code == status.HTTP_201_CREATED

    @mock_get_biopy_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_put(self, client):
        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)
        url = '/rest/api/combinatorial/' + str(combinatorial.id) + '/'

        data = self.get_combinatorial_dict()

        data['name'] = 'new_name'

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.put(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        assert len(resp_obj['parts']) == 2
        assert 'order' in resp_obj['parts'][0][0]
        assert 'non_field_errors' not in resp_obj
        assert 'projects' in resp_obj
        assert resp_obj['name'] == "new_name"
        assert response.status_code == status.HTTP_200_OK

    @mock_get_biopy_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_patch(self, client):
        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)
        url = '/rest/api/combinatorial/' + str(combinatorial.id) + '/'

        data = self.get_combinatorial_dict()

        data['name'] = 'new_name'

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        assert len(resp_obj['parts']) == 2
        assert 'order' in resp_obj['parts'][0][0]
        assert 'non_field_errors' not in resp_obj
        assert 'projects' in resp_obj
        assert resp_obj['name'] == "new_name"
        assert response.status_code == status.HTTP_200_OK

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_patch_should_update_report(self, client):
        user_a = UserFactory()
        project = CombinatorialProjectFactory(user=user_a)
        url = '/rest/api/combinatorial/' + str(project.id) + "/"
        parts = self.get_two_parts()
        settings = self.get_settings()

        data = self.get_combinatorial_dict()

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        proj = resp_obj['projects'][0]

        assert 'primers' in proj['report']
        assert 'forward_primer' in proj['report']['primers'][0]

    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_delete(self, client):
        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)
        url = '/rest/api/combinatorial/' + str(combinatorial.id) + '/'
        client.login(username=user_a.username, password='client')
        response = client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_json_validation_valid(self):
        pass

    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_json_validation_invalid(self):
        pass

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    @mock_ice_post_to_ice_with_client
    def test_combinatorial_should_have_user(self, client):
        from primer_suggestion.models import CombinatorialProject

        user_a = UserFactory()

        url = '/rest/api/combinatorial/'

        data = self.get_combinatorial_dict()

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        combinatorial = CombinatorialProject.objects.get(pk=resp_obj['id'])
        assert combinatorial.user == user_a

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    @mock_ice_post_to_ice_with_client
    def test_combinatorial_projects_should_have_user(self, client):
        from primer_suggestion.models import CombinatorialProject

        user_a = UserFactory()

        url = '/rest/api/combinatorial/'

        data = self.get_combinatorial_dict()

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        combinatorial = CombinatorialProject.objects.get(pk=resp_obj['id'])
        for project in combinatorial.projects.all():
            assert project.user == user_a

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    @mock_ice_post_to_ice_with_client
    def test_updated_combinatorial_projects_should_have_user(self, client):
        from primer_suggestion.models import CombinatorialProject

        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)

        url = '/rest/api/combinatorial/' + str(combinatorial.id) + '/'

        data = self.get_combinatorial_dict()

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        combinatorial = CombinatorialProject.objects.get(pk=resp_obj['id'])
        for project in combinatorial.projects.all():
            assert project.user == user_a

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    @mock_ice_post_to_ice_with_client
    def test_combinatorial_projects_should_share_options(self, client):
        from primer_suggestion.models import CombinatorialProject

        user_a = UserFactory()

        url = '/rest/api/combinatorial/'

        data = self.get_combinatorial_dict()
        data['amusercloning']['melting_temperature'] = 40
        data['amusercloning']['temperature_option'] = 'manual'
        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        combinatorial = CombinatorialProject.objects.get(pk=resp_obj['id'])
        assert combinatorial.amusercloning.melting_temperature == 40
        assert resp_obj['amusercloning']['temperature_option'] == 'manual'
        for project in combinatorial.projects.all():
            assert project.amusercloning.melting_temperature == 40


@pytest.mark.django_db
class TestCombinatorialFileDownloads():
    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_csv_file(self, client):
        # TODO: write some assertions

        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)
        url = f'/rest/api/combinatorial/{combinatorial.id}/csv/'

        print(url)

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')

        assert response.status_code == 200

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_combinatorial_genbank_file(self, client):
        import tempfile
        import io
        import zipfile
        # TODO: write some assertions
        user_a = UserFactory()
        combinatorial = CombinatorialProjectFactory(user=user_a)

        url = f'/rest/api/combinatorial/{combinatorial.id}/genbank/'

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')
        assert response.status_code == 200

        with tempfile.TemporaryFile() as tmp:
            tmp.write(response.content)
            tmp.seek(0)
            zipped_file = zipfile.ZipFile(tmp)
            assert len(zipped_file.namelist()) == len(
                combinatorial.projects.all())
