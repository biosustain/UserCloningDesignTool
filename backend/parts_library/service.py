from Bio import SeqIO
from io import StringIO
from functools import lru_cache
import functools
import operator
import json
import requests


def genbank_to_ice_feature(feat):
    '''Converts a genbank feature to an ice feature'''
    ice_feat = {
        "type": feat.type,
        "name": feat.type,
        "strand": feat.location.strand,
        'locations': [{
            'genbankStart': str(feat.location.start),
            'end': str(feat.location.end),
        }]
    }

    notes = []
    for name, value in feat.qualifiers.items():
        notes.append({
            'name': name,
            'value': value[0],
            'quoted': False
        })

    ice_feat['notes'] = notes

    return ice_feat


# TODO: return a 404 in detailview when part doesn't have a sequence
# TODO: maybe rename to IceService
class PartService(object):
    def __init__(self, ice_comm):
        self.ice_comm = ice_comm

    @staticmethod
    def fix_ice_genbank(gb):
        '''there is a bug in ice or biopython (not sure which), that
        creates a parsing error when opening ice genbank files.
        This fixes that'''
        edt_line = gb.readlines()
        locus_line = edt_line[0]
        locus_line = locus_line.replace(b"\n", b"       \n")
        remove_space_line = locus_line[12:22].replace(b' ', b'_')
        locus_line = locus_line.replace(locus_line[12:22], remove_space_line)
        edt_line[0] = locus_line
        genseq = StringIO(b"".join(edt_line).decode())
        return genseq

    def get_parts_list(self):
        res = json.loads(self.ice_comm.get_ice_part_list())
        res = self.filter_results(res)
        return res

    def get_parts_detail(self, part_id):
        part = json.loads(self.ice_comm.get_ice_part_detail(part_id))
        part['url'] = self.get_vector_editor_url(part_id)
        return part

    def get_feats(self, part_id, fwd_strand=True):
        res = self.get_biopy_object(part_id, fwd_strand)
        return res.features

    def get_sequence(self, part_id, fwd_strand=True):
        res = self.get_biopy_object(part_id, fwd_strand)
        return res.seq

    def get_sequence_and_feats(self, part_id):
        '''The entry info and the sequence and feats are seperate calls in ice'''
        seq_and_feats = json.loads(
            self.ice_comm.get_ice_part_sequence(part_id))
        seq_and_feats = self.validate_seq_and_feats(seq_and_feats)
        return seq_and_feats

    # This is cached to avoid slow api calls
    @lru_cache(maxsize=3)
    def get_biopy_object(self, part_id, fwd_strand=True):
        gb = self.ice_comm.get_genbank_record(part_id)
        gb = self.fix_ice_genbank(gb)
        for seq_record in SeqIO.parse(gb, "genbank"):
            if fwd_strand:
                return seq_record
            else:
                return seq_record.reverse_complementary

    def get_multiple_biopy_objects(self, part_id_list):
        gb_list = self.ice_comm.get_multiple_genbank_records(part_id_list)
        seq_dict = {}
        for gb in gb_list:
            gb_fix = self.fix_ice_genbank(gb)
            for seq in SeqIO.parse(gb_fix, "genbank"):
                seq_dict[gb.name[:-3]] = seq
        return seq_dict

    def search_ice_part(self, query):
        res = json.loads(self.ice_comm.search_ice_part(query))
        res = self.filter_results(res)
        return res

    def filter_results(self, res):
        # remove all parts that don't have a sequence associated with them.
        res['results'] = [part for part in res['results']
                          if part['entryInfo']['hasSequence']]
        res['resultCount'] = len(res['results'])
        return res

    def get_vector_editor_url(self, part_id):
        '''returns a link that opens the vector editor for the current session'''
        url = 'static/swf/ve/VectorEditor?entryId={}&sessionId={}'.format(
            part_id, self.ice_comm.token)
        return self.ice_comm.get_request_url(url)

    def post_project_to_ice(self, project):
        '''Uploads the project to ice along with its sequence'''
        res = self.post_base_project_to_ice(project)
        project.ice_id = res['id']
        project.save()
        self.post_project_sequence_to_ice(project)

    def post_base_project_to_ice(self, project):
        '''Serialize the project data so it can be uploaded to ice.
        This does not include uploading the sequence which is done seperately'''
        full_name = f'{project.user.first_name} {project.user.last_name}'
        data = {
            'name': project.name,
            'type': 'PLASMID',
            'status': 'Complete',
            'principalInvestigator': full_name,
            'principalInvestigatorEmail': project.user.email,
            'longDescription': project.description,
            'shortDescription': project.description,
            'selectionMarkers': ['None'],
            'plasmidData': {
                # 'backbone': project.sequence or '',
                'circular': project.amusercloning.circular_output
            }
        }
        if project.ice_id:
            url = 'rest/parts/{}/'.format(project.ice_id)
            url = self.ice_comm.get_request_url(url)
            headers = self.ice_comm.get_request_header_default()
            headers["Content-type"] = "application/json"
            res = requests.put(url,
                               data=str(data),
                               verify=False,
                               headers=headers)
            res = res.text
        else:
            url = 'rest/parts/'
            res = self.ice_comm.ice_post_request(url, data)

        return json.loads(res)

    def post_project_sequence_to_ice(self, project):
        '''Serializes the project genbank file so that the features can be uploaded
        to ice'''
        ice_id_list = project.part_ice_id_list
        gb_dict = self.get_multiple_biopy_objects(ice_id_list)
        sorted_ice_name = [
            part.ice_name for part in project.part_list]
        biopy_list = [gb_dict[ice_name] for ice_name in sorted_ice_name]
        biopy_obj = functools.reduce(operator.add, biopy_list)

        url = 'rest/parts/{}/sequence/'.format(project.ice_id)
        data = {
            'features': [],
            'isCircular': project.amusercloning.circular_output,
            'sequence': str(biopy_obj.seq)
        }
        for i, feat in enumerate(biopy_obj.features):
            data['features'].append(genbank_to_ice_feature(feat))
        res = self.ice_comm.ice_post_request(url, data)
        return json.loads(res)

    def validate_seq_and_feats(self, seq_and_feats):
        errors = []
        # TODO: this is pretty ugly, so it needs a refactor
        for feat in seq_and_feats.get('features', []):
            error_found = False
            new_feat = {}
            # Add an error field to all feature fields
            for key, value in feat.items():
                if key == 'locations':
                    new_locations = []
                    for loc in value:
                        new_loc = {
                            'genbankStart': {
                                'value': loc['genbankStart'],
                                'error': ''
                            },
                            'end': {
                                'value': loc['end'],
                                'error': ''
                            }
                        }
                        new_locations.append(new_loc)
                    new_feat['locations'] = new_locations
                else:
                    new_feat[key] = {
                        'value': value,
                        'error': ''
                    }

            for j, loc in enumerate(feat['locations']):
                if loc['genbankStart'] < 0:
                    error_msg = 'Start location is less than 0'
                    new_feat['locations'][j]['genbankStart'] = {
                        'value': loc['genbankStart'],
                        'error': error_msg
                    }
                    error_found = True
                if error_found:
                    errors.append(new_feat)
        if len(errors) > 0:
            seq_and_feats['errors'] = errors
        return seq_and_feats
