import pytest
from unittest.mock import patch

from .decorators.ice_decorators import mock_ice_comm
from .factories.authentication_factories import UserFactory

from django.http import HttpRequest
from jwt_authentication.signals import login_to_ice, logout_off_ice


class TestLoginToIceSignal():
    @pytest.mark.django_db
    @mock_ice_comm
    def test_login_signal_func_should_log_in_to_ice(self, client, mock_ice):
        from django.contrib.auth.models import User
        user_a = UserFactory(username='UserA')
        user_a.iceuserprofile.ice_token = None

        request = HttpRequest()
        request.method = 'POST'
        request.POST['username'] = user_a.username
        request.POST['password'] = 'client'

        login_to_ice(user_a.__class__, user_a, request)
        user_a = User.objects.get(pk=user_a.id)
        assert user_a.iceuserprofile.ice_token == mock_ice.return_value

    @pytest.mark.django_db
    @mock_ice_comm
    def test_login_signal_func_should_log_out_off_ice(self, client, mock_ice):
        user_a = UserFactory(username='UserA')

        request = HttpRequest()
        request.method = 'POST'
        request.POST['username'] = user_a.username
        request.POST['password'] = user_a.password

        logout_off_ice(user_a.__class__, user_a, request)
        assert not user_a.iceuserprofile.ice_token

    @pytest.mark.django_db
    @mock_ice_comm
    def test_if_login_fails_user_should_still_be_logged_in_to_backend(self, client, mock_ice):
        user_a = UserFactory(username='UserA')

        request = HttpRequest()
        request.method = 'POST'
        request.POST['username'] = user_a.username
        request.POST['password'] = user_a.password

        login_to_ice(user_a.__class__, user_a, request)
