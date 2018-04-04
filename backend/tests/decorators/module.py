import inspect
import json
from tests.dependencies.create_gb import get_gb as gb
from unittest.mock import patch, PropertyMock

# TODO: these functions need refactor as they are NOT DRY
def mock_all(func):
    @patch('parts_library.service.PartService.post_project_to_ice')
    @patch('parts_library.service.PartService.post_project_sequence_to_ice')
    @patch('parts_library.service.PartService.get_biopy_object')
    @patch('parts_library.service.PartService.get_multiple_biopy_objects')
    def wrapper(self,
                mock_multiple,
                mock_single,
                mock_seq,
                mock_ice,
                *args,
                **kwargs):
        mock_single.return_value = gb()
        mock_multiple.return_value = {'CRURPS14': gb()}
        data = {
            'id': 1,
            'name': "new_project",
            'type': 'PLASMID',
            'status': 'Complete',
            'longDescription': 'No description',
            'plasmidData': {
                'circular': False
            }
        }
        mock_ice.return_value = data

        data = {
            'features': [],
            'isCircular': False,
            'sequence': ''
        }
        mock_seq.return_value = data
        func(self, *args, **kwargs)
    return wrapper

def mock_get_biopy(func):
    'mocks the ice service by overwriting the get genbank function in the service'
    @patch('parts_library.service.PartService.get_biopy_object')
    def wrapper(self, mock, *args, **kwargs):
        print('args', args)
        print('kwargs', kwargs)
        mock.return_value = gb()
        func(self, *args, **kwargs)
    return wrapper


def mock_get_biopy_with_client(func):
    'mocks the ice service by overwriting the get genbank function in the service'
    @patch('parts_library.service.PartService.get_biopy_object')
    @patch('parts_library.service.PartService.get_multiple_biopy_objects')
    def wrapper(self, mock_multiple, mock_single, client, *args, **kwargs):
        print('args', args)
        print('kwargs', kwargs)
        mock_single.return_value = gb()
        mock_multiple.return_value = {'CRURPS14': gb()}
        func(self, client, *args, **kwargs)
    return wrapper


def mock_get_multiple_biopy_objects(func):
    'mocks the ice service by overwriting the biopy list in the part handler'
    @patch('parts_library.service.PartService.get_multiple_biopy_objects')
    def wrapper(self, mock, *args, **kwargs):
        print('args', args)
        print('kwargs', kwargs)
        mock.return_value = {'CRURPS14': gb()}
        func(self, *args, **kwargs)
    return wrapper


def mock_get_multiple_biopy_objects_with_client(func):
    'mocks the ice service by overwriting the biopy list in the part handler'
    @patch('parts_library.service.PartService.get_multiple_biopy_objects')
    def wrapper(self, mock, client, *args, **kwargs):
        print('args', args)
        print('kwargs', kwargs)
        mock.return_value = {'CRURPS14': gb()}
        func(self, client, *args, **kwargs)
    return wrapper


def mock_ice_post_to_ice(func):
    @patch('parts_library.service.PartService.post_project_to_ice')
    @patch('parts_library.service.PartService.post_project_sequence_to_ice')
    def wrapper(self, mock_seq, mock_proj, *args, **kwargs):
        data = {
            'id': 1,
            'name': "new_project",
            'type': 'PLASMID',
            'status': 'Complete',
            'longDescription': 'No description',
            'plasmidData': {
                'circular': False
            }
        }
        mock_proj.return_value = data

        data = {
            'features': [],
            'isCircular': False,
            'sequence': ''
        }
        mock_seq.return_value = data
        func(self, *args, **kwargs)
    return wrapper


def mock_ice_post_to_ice_with_client(func):
    @patch('parts_library.service.PartService.post_project_to_ice')
    @patch('parts_library.service.PartService.post_project_sequence_to_ice')
    def wrapper(self, client, mock_seq, mock_proj, *args, **kwargs):
        data = {
            'id': 1,
            'name': "new_project",
            'type': 'PLASMID',
            'status': 'Complete',
            'longDescription': 'No description',
            'plasmidData': {
                'circular': False
            }
        }
        mock_proj.return_value = data

        data = {
            'features': [],
            'isCircular': False,
            'sequence': ''
        }
        mock_seq.return_value = data
        func(self, client, *args, **kwargs)
    return wrapper


def patch_class_with_mock(cls):
    'Mock the ice service for all test methods in pytest class'
    for name, method in inspect.getmembers(cls, inspect.isfunction):
        if name.startswith("test_"):
            setattr(cls, name, mock_all(method))
        else:
            continue
    return cls
