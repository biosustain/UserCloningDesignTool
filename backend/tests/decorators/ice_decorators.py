from unittest.mock import patch
from tests.dependencies.create_gb import get_gb_file_path
from Bio import SeqIO

import json

CORRECT_LOGIN_CREDENTIALS = {
    'ice_username': 'dummy',
    'ice_password': 'new_password'
}


class FakeIceComm(object):
    """Fake IceComm instance used for testing"""
    def __init__(self, arg):
        super(FakeIceComm, self).__init__()
        self.arg = arg
        self.token = self.get_token

    def search_ice_part(self, query):
        return json.dumps({'count': 0, 'results': []})

    def get_token():
        return 'fake_token'

    def get_multiple_genbank_records(self, ice_id_list):
        return [open(get_gb_file_path(), 'rb') for ice_id in ice_id_list]


def mock_ice_comm(func):
    # @patch('parts_library.models.IceUserProfile.ice_comm')
    def wrapper(self, client, *args, **kwargs):
        with patch('ice.comm.IceCommunication.get_token') as mock_ice:
            mock_ice.return_value = 'fake_token'
            func(self, client, mock_ice, *args, **kwargs)
    return wrapper
