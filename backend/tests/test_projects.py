import pytest
from unittest.mock import patch

import json

import factory
from django.contrib.auth.signals import user_logged_in

from .factories.primer_suggestion_factories import AmuserCloningProjectFactory, ProjectFactory
from .factories.authentication_factories import UserFactory
from .decorators.module import patch_class_with_mock, mock_get_multiple_biopy_objects_with_client, mock_ice_post_to_ice_with_client, mock_get_biopy_with_client
from .decorators.ice_decorators import mock_ice_comm

from rest_framework import status


def get_two_parts():
    parts = [
        {
            'fwd_strand': False,
            'name': "crtI_WT",
            'order': 1,
            'ice_id': 1,
            'ice_name': 'CRURPS14'
        },
        {
            'fwd_strand': True,
            'name': "crtYB_WT",
            'order': 2,
            'ice_id': 1,
            'ice_name': 'CRURPS14'
        }
    ]

    return parts


def get_settings():
    settings = {
        'temperature_option': 'manual',
        'circular_output': False,
        'melting_temperature': 50,
        'primer_concentration': 0.7,
        'sodium_concentration': 50
    }

    return settings


@pytest.mark.django_db
class TestProjectRESTInteraction():
    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_post(self, client):
        url = '/rest/api/projects/'
        parts = get_two_parts()
        settings = get_settings()

        user_a = UserFactory()
        data = {"name": "new_project",
                "parts": parts,
                "amusercloning": settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        print(resp_obj)
        # assert resp_obj['parts'][0]['fwd_strand'] is False
        assert len(resp_obj['parts']) == 2
        assert 'non_field_errors' not in resp_obj
        assert resp_obj['name'] == "new_project"
        assert response.status_code == status.HTTP_201_CREATED

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_put(self, client):
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"

        parts = get_two_parts()
        settings = get_settings()

        data = {"name": "new_name",
                "parts": parts,
                "amusercloning": settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.put(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        print(resp_obj)
        assert len(resp_obj['parts']) == 2
        assert 'non_field_errors' not in resp_obj
        assert resp_obj['name'] == "new_name"
        assert response.status_code == status.HTTP_200_OK

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_patch(self, client):
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"
        parts = get_two_parts()
        settings = get_settings()

        data = {"name": "new_name",
                "parts": parts,
                "amusercloning": settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        print(resp_obj)

        assert len(resp_obj['parts']) == 2
        assert 'non_field_errors' not in resp_obj
        assert resp_obj['name'] == "new_name"
        assert response.status_code == status.HTTP_200_OK

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_patch_should_update_report(self, client):
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"
        parts = get_two_parts()
        settings = get_settings()

        data = {"name": "new_name",
                "parts": parts,
                "amusercloning": settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())

        assert 'primers' in resp_obj['report']
        assert 'forward_primer' in resp_obj['report']['primers'][0]

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_delete(self, client):
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"
        client.login(username=user_a.username, password='client')
        response = client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_get(self, client):
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"
        client.login(username=user_a.username, password='client')
        response = client.get(url)
        print('response', response)
        assert response.status_code == status.HTTP_200_OK

    @mock_get_biopy_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_delete_parts_when_modifying_project(self, client):
        '''When modifying a project part removed parts should be deleted'''
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"
        parts = get_two_parts()
        settings = get_settings()

        parts[0]['ice_id'] = project.part_list[0].ice_id
        parts[0]['id'] = project.part_list[0].id

        data = {"name": "new_name",
                "parts": parts,
                "amusercloning": settings}

        data = json.dumps(data)

        part1_id = project.part_list[0].id
        part2_id = project.part_list[1].id

        print(project.part_list)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')

        print(project.part_list)

        assert response.status_code == status.HTTP_200_OK
        assert len(project.part_list) == 2
        assert project.part_list[0].id == part1_id
        assert project.part_list[1].id != part2_id

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_csv_file(self, client):
        # TODO: write some assertions

        url = '/rest/api/projects/csv/?project='
        user_a = UserFactory()
        project1 = ProjectFactory(user=user_a)
        project2 = ProjectFactory(user=user_a)

        url += f'[{project1.id},{project2.id}]'
        print(url)

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')

        print(response)
        assert response.status_code == 200

    @mock_get_biopy_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_should_have_user(self, client):
        from primer_suggestion.models import Project

        url = '/rest/api/projects/'
        parts = get_two_parts()
        settings = get_settings()

        user_a = UserFactory()
        data = {"name": "new_project",
                "parts": parts,
                "amusercloning": settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        project = Project.objects.get(pk=resp_obj['id'])
        assert project.user == user_a


@pytest.mark.django_db
class TestProjectIceInteraction():
    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_with_part_not_in_ice_should_return_error(self, client):
        # TODO: write some assertions

        url = '/rest/api/projects/'
        user_a = UserFactory()
        project1 = ProjectFactory(
            user=user_a, _part_handler__part1__ice_name='wrong_name')

        url += f'{project1.id}/'

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')

        assert project1.part_list[0].ice_name == 'wrong_name'
        assert len(response.data['errors']) > 0
        assert project1.part_list[0].ice_name in response.data['errors'][0]
        assert str(project1.part_list[0].ice_id) in response.data['errors'][0]


@pytest.mark.django_db
class TestProjectFileDownloads():
    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_csv_file(self, client):
        # TODO: write some assertions

        url = '/rest/api/projects/csv/?project='
        user_a = UserFactory()
        project1 = ProjectFactory(user=user_a)
        project2 = ProjectFactory(user=user_a)

        url += f'[{project1.id},{project2.id}]'
        print(url)

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')

        print(response)
        assert response.status_code == 200

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_genbank_file(self, client):
        # TODO: write some assertions
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)

        url = f'/rest/api/projects/{project.id}/genbank/'

        client.login(username=user_a.username, password='client')
        response = client.get(url, content_type='application/json')

        assert response.status_code == 200


@pytest.mark.django_db
class TestProjectCreation():
    @mock_get_biopy_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_parts_should_have_a_name(self, client):
        url = '/rest/api/projects/'
        parts = get_two_parts()
        settings = get_settings()

        user_a = UserFactory()
        data = {'name': 'new_project',
                'parts': parts,
                'amusercloning': settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        resp_obj = json.loads(response.content.decode())
        assert resp_obj['parts'][0]['name'] == 'crtI_WT'

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    @mock_ice_comm
    @patch('parts_library.service.PartService.post_project_to_ice')
    def test_new_project_should_be_uploaded_to_ice(self, client, mock_ice_comm, mock_service):
        url = '/rest/api/projects/'
        parts = get_two_parts()
        settings = get_settings()

        user_a = UserFactory()
        data = {'name': 'new_project',
                'parts': parts,
                'amusercloning': settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.post(url, data, content_type='application/json')
        assert mock_service.called
        assert mock_service.called_once

    @mock_get_biopy_with_client
    @factory.django.mute_signals(user_logged_in)
    @mock_ice_comm
    @patch('parts_library.service.PartService.post_project_to_ice')
    def test_updated_project_should_be_uploaded_to_ice(self, client, mock_ice_comm, mock_service):
        user_a = UserFactory()
        project1 = ProjectFactory(user=user_a)
        url = f'/rest/api/projects/{project1.id}/'
        parts = get_two_parts()
        settings = get_settings()

        data = {'parts': parts,
                'amusercloning': settings}

        data = json.dumps(data)

        client.login(username=user_a.username, password='client')
        response = client.patch(url, data, content_type='application/json')
        assert mock_service.called
        assert mock_service.called_once
