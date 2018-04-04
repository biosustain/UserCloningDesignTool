import pytest

import factory
from django.contrib.auth.signals import user_logged_in

from .factories.primer_suggestion_factories import ProjectFactory
from .factories.authentication_factories import UserFactory
from .decorators.module import patch_class_with_mock, mock_get_biopy_with_client, mock_get_multiple_biopy_objects_with_client
from rest_framework import status


@pytest.mark.django_db
class TestGetActions:
    @mock_get_multiple_biopy_objects_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_base_url(self, client):
        user = UserFactory()
        client.login(username=user.username, password='client')
        response = client.get('/rest/api/')
        assert response.status_code == status.HTTP_200_OK

    # TODO: Since authentication makes all go to 401 this test should be rewritten
    # @mock_get_multiple_biopy_objects_with_client
    @factory.django.mute_signals(user_logged_in)
    # def test_project_detail_not_existing(self, client):
    #     response = client.get('/rest/api/projects/1000/')
    #     user = UserFactory()
    #     client.login(username=user.username, password='client')
    #     assert response.status_code == status.HTTP_404_NOT_FOUND

    @mock_get_multiple_biopy_objects_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_project_search(self, client):
        user = UserFactory()
        client.login(username=user.username, password='client')
        response = client.get('/rest/api/projects/?search=')
        assert response.status_code == status.HTTP_200_OK

    # @pytest.mark.django_db
    # def test_part_list(self, client):
    #     response = client.get('/rest/api/parts/')
    #     assert response.status_code == status.HTTP_200_OK

    # @pytest.mark.django_db
    # def test_part_detail_exists(self, client):
    #     response = client.get('/rest/api/parts/1/')
    #     assert response.status_code == status.HTTP_200_OK

    # @pytest.mark.django_db
    # def test_part_detail_not_existing(self, client):
    #     response = client.get('/rest/api/parts/1000/')
    #     assert response.status_code == status.HTTP_404_NOT_FOUND

    # @pytest.mark.django_db
    # def test_part_search(self, client):
    #     response = client.get('/rest/api/parts/?search=')
    #     assert response.status_code == status.HTTP_200_OK

    # @pytest.mark.django_db
    # def test_seq_record_list(self, client):
    #     response = client.get('/rest/api/seqrecords/')
    #     assert response.status_code == status.HTTP_200_OK

    # @pytest.mark.django_db
    # def test_seq_record_detail_exists(self, client):
    #     response = client.get('/rest/api/seqrecords/1/')
    #     assert response.status_code == status.HTTP_200_OK

    # @pytest.mark.django_db
    # def test_seq_record_detail_not_existing(self, client):
    #     response = client.get('/rest/api/seqrecords/1000/')
    #     assert response.status_code == status.HTTP_404_NOT_FOUND

    # @pytest.mark.django_db
    # def test_seq_record_search(self, client):
    #     response = client.get('/rest/api/seqrecords/?search=')
    #     assert response.status_code == status.HTTP_200_OK
