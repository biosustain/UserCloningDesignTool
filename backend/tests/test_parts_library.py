import pytest
import factory
from parts_library.models import Part
from jwt_authentication.models import IceUserProfile
from .decorators.module import patch_class_with_mock
from .decorators import mock_ice_comm, CORRECT_LOGIN_CREDENTIALS
from .factories.part_library_factories import PartHandlerFactoryWithTwoParts
from .factories.authentication_factories import UserFactory

from unittest.mock import patch
from rest_framework import status

import sys
import json


# TODO: fix the parthandler factory
@pytest.mark.django_db
@patch_class_with_mock
class TestPartHandlerProperties():
    def test_part_list_order(self):
        part_handler = PartHandlerFactoryWithTwoParts()
        part_list = part_handler.part_list
        assert part_list[0].order == 0
        assert part_list[1].order == 1

        # reverse the order to check that the sorting updates
        id1 = part_list[0].id
        id2 = part_list[1].id
        part1 = part_handler.parts.get(pk=id1)
        part1.order = 1
        part1.save()

        part2 = part_handler.parts.get(pk=id2)
        part2.order = 0
        part2.save()

        part_list = part_handler.part_list
        assert part_list[0].order == 0
        assert part_list[0].id == id2
        assert part_list[1].order == 1
        assert part_list[1].id == id1
