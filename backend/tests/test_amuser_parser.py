import pytest

import factory
from django.contrib.auth.signals import user_logged_in

from .factories.primer_suggestion_factories import AmuserCloningProjectFactory, ProjectFactory
from .factories.authentication_factories import UserFactory
from .decorators.module import mock_ice_post_to_ice_with_client, mock_get_multiple_biopy_objects_with_client

@pytest.mark.django_db
class TestAmuserParser():
    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_returned_data_has_name(self, client):
        user_a = UserFactory()
        project = ProjectFactory(user=user_a)
        url = '/rest/api/projects/' + str(project.id) + "/"
        client.login(username=user_a.username, password='client')
        response = client.get(url)
        assert 'name' in response.data['report']['primers'][0]

    def test_amuser_cloning_can_detect_combinatorial(self, client):
        pass

    def test_amuser_cloning_can_detect_project(self, client):
        pass
