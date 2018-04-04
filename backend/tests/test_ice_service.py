import pytest

from .factories.primer_suggestion_factories import ProjectFactory
from .decorators.module import patch_class_with_mock
from .dependencies.create_gb import get_gb

from parts_library.service import PartService
from .decorators.ice_decorators import FakeIceComm


@pytest.mark.django_db
@patch_class_with_mock
class TestIceServiceMethods():
    def test_search_ice_parts(self):
        ice_comm = FakeIceComm({})
        service = PartService(ice_comm)
        service.search_ice_part('test')

    def test_get_multiple(self):
        pass

    def test_get_multiple_with_empty_list(self):
        '''The get multiple method should return an empty
        dictionary when given an empty list'''
        pass

# TODO: This need way more test to look at the format returned
