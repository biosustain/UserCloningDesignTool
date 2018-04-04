import pytest
from unittest.mock import patch

import factory
from django.contrib.auth.signals import user_logged_in

from .decorators.ice_decorators import mock_ice_comm
from .factories.authentication_factories import UserFactory

from django.http import HttpRequest
from jwt_authentication.signals import login_to_ice, logout_off_ice


@pytest.mark.django_db
class TestJwtAuthentication():
    @mock_ice_comm
    @patch('jwt_authentication.signals.jwt_obtained.send')
    def test_succesful_login_should_fire_signal(self, client, mock_ice, mock):
        user_a = UserFactory(username='UserA')
        user_a.iceuserprofile.ice_token = None

        url = '/rest/api/token-auth/'

        data = {
            'username': user_a.username,
            'password': 'client'
        }

        client.post(url, data)

        assert mock.called
        assert mock.called_once

    @mock_ice_comm
    def test_token_expiry_should_delete_ice_token(self, client, mock_ice):
        user_a = UserFactory(username='UserA')
        user_a.iceuserprofile.ice_token = None

        assert not user_a.iceuserprofile.ice_token
