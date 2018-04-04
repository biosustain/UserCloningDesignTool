import pytest

import factory
from django.contrib.auth.signals import user_logged_in

from .factories.primer_suggestion_factories import ProjectFactory, CombinatorialProjectFactory
from .factories.authentication_factories import UserFactory
from .decorators.module import mock_get_multiple_biopy_objects_with_client, mock_ice_post_to_ice_with_client


@pytest.mark.django_db
class TestProjectPermissions():
    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_can_see_own_projects_in_list_view(self, client):
        # Projects that the user should see
        user_a = UserFactory(username='UserA')
        project1 = ProjectFactory(user=user_a)
        project2 = ProjectFactory(user=user_a)

        url = '/rest/api/projects/'

        client.login(username='UserA', password='client')
        response = client.get(url)
        print('response', response)
        names = [project['name'] for project in response.data['results']]
        assert project1.name in names
        assert project2.name in names
        assert len(names) == 2

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_cannot_see_others_projects_in_list_view(self, client):
        # Projects that the user should see
        user_a = UserFactory(username='UserA')
        project1 = ProjectFactory(user=user_a)
        project2 = ProjectFactory(user=user_a)

        # Project that the user shouldn't see
        user_b = UserFactory(username='UserB')
        project3 = ProjectFactory(user=user_b)

        url = '/rest/api/projects/'

        client.login(username=user_a.username, password='client')
        resp = client.get(url)
        assert resp.status_code == 200

        names = [project['name'] for project in resp.data['results']]
        assert project1.name in names
        assert project2.name in names
        assert project3.name not in names
        assert len(names) == 2

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_cannot_get_list_view_when_not_logged_in(self, client):
        # Projects that the user should see
        user_a = UserFactory(username='UserA')
        project1 = ProjectFactory(user=user_a)
        project2 = ProjectFactory(user=user_a)

        url = '/rest/api/projects/'

        resp = client.get(url)
        assert resp.status_code == 401

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_can_get_own_detail_view(self, client):
        # Project that the user shouldn't see
        user_a = UserFactory(username='UserA')
        project = ProjectFactory(user=user_a)

        url = '/rest/api/projects/' + str(project.id) + '/'

        client.login(username=user_a.username, password='client')
        resp = client.get(url)
        assert resp.status_code == 200

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_cannot_get_others_detail_view(self, client):
        user_a = UserFactory(username='UserA')
        user_b = UserFactory(username='UserB')
        project = ProjectFactory(user=user_b)

        url = '/rest/api/projects/' + str(project.id) + '/'

        client.login(username=user_a.username, password='client')
        resp = client.get(url)
        assert resp.status_code == 404

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_cannot_get_detail_view_when_not_logged_in(self, client):
        # Project that the user shouldn't see
        project = ProjectFactory()

        url = '/rest/api/projects/' + str(project.id) + '/'

        resp = client.get(url)
        assert resp.status_code == 401


@pytest.mark.django_db
class TestCombinatorialPermissions():
    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_user_only_seeing_own_combinatorial(self, client):
        # Combinatorials that the user should see
        user_a = UserFactory()
        combinatorial1 = CombinatorialProjectFactory(user=user_a)
        combinatorial2 = CombinatorialProjectFactory(user=user_a)

        url = '/rest/api/combinatorial/'

        client.login(username=user_a.username, password='client')
        response = client.get(url)
        print('response', response)
        names = [combinatorial['name']
                 for combinatorial in response.data['results']]
        assert combinatorial1.name in names
        assert combinatorial2.name in names
        assert len(names) == 2

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_user_not_seeing_others_combinatorial(self, client):
        # Combinatorials that the user should see
        user_a = UserFactory(username='UserA')
        combinatorial1 = CombinatorialProjectFactory(user=user_a)
        combinatorial2 = CombinatorialProjectFactory(user=user_a)

        user_b = UserFactory(username='UserB')
        combinatorial3 = CombinatorialProjectFactory(user=user_b)

        url = '/rest/api/combinatorial/'

        client.login(username='UserA', password='client')
        response = client.get(url)
        print('response', response)
        names = [combinatorial['name']
                 for combinatorial in response.data['results']]
        assert combinatorial1.name in names
        assert combinatorial2.name in names
        assert combinatorial3.name not in names
        assert len(names) == 2

    @mock_get_multiple_biopy_objects_with_client
    @mock_ice_post_to_ice_with_client
    @factory.django.mute_signals(user_logged_in)
    def test_cannot_see_combinatorial_when_not_logged_in(self, client):
        # Combinatorials that the user should see
        combinatorial1 = CombinatorialProjectFactory()
        combinatorial2 = CombinatorialProjectFactory()

        url = '/rest/api/combinatorial/'

        response = client.get(url)
        print('response', response)
        assert response.status_code == 401
