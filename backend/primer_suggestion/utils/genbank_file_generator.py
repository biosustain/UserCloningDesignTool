import functools
import operator
from Bio import SeqIO, SeqFeature


class GenbankFileGenerator:
    def __init__(self, query, ice_service):
        self.query = query
        self.query_type = self.determine_project_or_combinatorial(query)
        self.ice_service = ice_service

    def get_genbank_file(self):
        gb_dict = self.query_service_for_parts()
        return self.generate_single_genbank_file(self.query, gb_dict)

    def determine_project_or_combinatorial(self, instance):
        from primer_suggestion.models import Project, CombinatorialProject
        '''Determines whether a single instance is a project or
        combinatorial project'''
        if isinstance(instance, Project):
            return 'project'
        elif isinstance(instance, CombinatorialProject):
            return 'combinatorial'
        else:
            raise TypeError(
                'The query is of type %s not a project or a combinatorial project' % type(self.query_type))

    def query_service_for_parts(self):
        try:
            self.ice_service
        except AttributeError as e:
            # TODO: find more appropriate exception to throw
            raise AttributeError('Service is not set')

        try:
            ice_ids = list(set(self.get_ice_ids_from_query()))
            genbank_dict = self.ice_service.get_multiple_biopy_objects(ice_ids)
            return genbank_dict
        except Exception as e:
            raise e

    def get_ice_ids_from_query(self):
        return self.query.part_ice_id_list

    def create_biopy_list(self, genbank_dict, project):
        # get the basename for the file
        sorted_ice_name = [
            part.ice_name for part in project.part_list]
        biopy_list = [genbank_dict[ice_name] for ice_name in sorted_ice_name]
        return biopy_list

    def create_biopy_object(self, biopy_list):
        biopy_obj = functools.reduce(operator.add, biopy_list)
        return biopy_obj

    def set_origin_name_on_assembly(self, genbank_dict):
        for ice_name, biopy in genbank_dict.items():
            location = SeqFeature.FeatureLocation(0, len(biopy))
            qualifiers = {'label': biopy.name}
            feat = SeqFeature.SeqFeature(
                location, 'misc_feat', qualifiers=qualifiers)
            genbank_dict[ice_name].features.append(feat)
        return genbank_dict

    def generate_single_genbank_file(self, project, genbank_dict):
        genbank_dict = self.set_origin_name_on_assembly(genbank_dict)
        biopy_list = self.create_biopy_list(genbank_dict, project)
        biopy_obj = self.create_biopy_object(biopy_list)
        genbank_file = self.write_genbank_to_temp_file(biopy_obj)
        return genbank_file

    def write_genbank_to_temp_file(self, biopy_obj):
        '''Write a genbank file of the final assembly'''
        genbank_file = open(f'/tmp/{self.query.name}.gb', 'w+')
        SeqIO.write(biopy_obj, genbank_file, "genbank")
        genbank_file.seek(0)
        return genbank_file
