from Bio import SeqIO
from subprocess import Popen, PIPE
from shlex import split as shsplit
import tempfile

from ..utils import AmuserParser


class UserCloningReportGenerator(object):
    """Takes a query of object(s) (either Combinatorial Projects
    or regular projets) and generates a report for each"""

    def __init__(self, query, ice_service=None):
        super(UserCloningReportGenerator, self).__init__()
        self.query = query
        self.ice_service = ice_service
        self.query_type = None
        self.genbank_dict = None
        self._phuser_report_tempfile = tempfile.NamedTemporaryFile()
        self._fasta_named_tempfile = tempfile.NamedTemporaryFile(mode='w+')

    # TODO: this method isn't named (same goes for determine_project_or_combinatorial).
    def determine_query_type(self):
        '''Determines whether the query is a project or combinatorial project
        and whether there are multiple instances'''

        # Determine if it is query or a single instance
        if hasattr(self.query, 'first'):
            instance_type = self.determine_project_or_combinatorial(
                self.query.first())
            self.query_type = (instance_type, 'query_set')
            return self.query_type
        else:
            instance_type = self.determine_project_or_combinatorial(self.query)
            self.query_type = (instance_type, 'single')
            return self.query_type

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

    def get_ice_ids_from_query(self):
        if not self.query_type:
            self.determine_query_type()
            return self.get_ice_ids_from_query()
        elif self.query_type[1] == 'single':
            return self.get_ice_ids_from_query_type_single()
        elif self.query_type[1] == 'query_set':
            return self.get_ice_ids_from_query_type_queryset()

    def get_ice_ids_from_query_type_single(self):
        return self.query.part_ice_id_list

    def get_ice_ids_from_query_type_queryset(self):
        return [ice_id for sub_query in self.query
                for ice_id in sub_query.part_ice_id_list]

    def query_service_for_parts(self):
        try:
            self.ice_service
        except AttributeError as e:
            # TODO: find more appropriate exception to throw
            raise AttributeError('Service is not set')

        try:
            ice_ids = list(set(self.get_ice_ids_from_query()))
            self.genbank_dict = self.ice_service.get_multiple_biopy_objects(
                ice_ids)
            return self.genbank_dict
        except Exception as e:
            raise e

    def create_list_of_projects_from_query(self):
        if self.query_type == ('project', 'single'):
            return [self.query]
        elif self.query_type == ('combinatorial', 'single'):
            return list(self.query.projects.all())
        elif self.query_type == ('project', 'query_set'):
            return list(self.query)
        elif self.query_type == ('combinatorial', 'query_set'):
            return [project for combinatorial in self.query
                    for project in combinatorial.projects.all()]
        elif not self.query_type:
            self.determine_query_type()
            return self.create_list_of_projects_from_query()

    def generate_dict_of_parsed_reports(self):
        # Phuser report
        if not self.query:
            self.query_service_for_parts()
        project_list = self.create_list_of_projects_from_query()
        report_dict = {project.name: self.generate_single_report(
            project) for project in project_list}
        return report_dict

    def generate_single_report(self, project):
        if not self.genbank_dict:
            self.query_service_for_parts()

        errors = self.check_all_parts_are_available_in_ice(self.genbank_dict, project)
        report_and_error = {
            'report': '',
            'errors': errors
        }

        if len(errors) == 0:
            cmd_string = self.generate_phuser_cmd_string(project.amusercloning)
            biopy_list = self.create_biopy_list(self.genbank_dict, project)
            self.write_to_fasta_tempfile(biopy_list)
            report = self.write_to_phuser_report_file(cmd_string)
            report = AmuserParser(report.read().decode()).to_dict()
            report_and_error['report'] = report

        return report_and_error

    def check_all_parts_are_available_in_ice(self, genbank_dict, project):
        errors = []
        for part in project.part_list:
            try:
                genbank_dict[part.ice_name]
            except Exception as e:
                err_msg = f'Part with name {part.ice_name} and id {part.ice_id} could not be found in ice'
                errors.append(err_msg)
        return errors

    def generate_phuser_cmd_string(self, amuser_cloning):
        base_cmd = "perl AMUSER_v39.pl"
        infile_cmd = " -i " + self._fasta_named_tempfile.name
        repfile_cmd = " -r " + self._phuser_report_tempfile.name
        minimum_cmd = base_cmd + infile_cmd + repfile_cmd

        if amuser_cloning.casette:
            minimum_cmd += " " + amuser_cloning.casette.cmd_string
        if amuser_cloning.temperature_option == 2:
            minimum_cmd += " -tm " + str(amuser_cloning.melting_temperature)
        elif amuser_cloning.temperature_option == 1:
            minimum_cmd += " -tm eq"
        if amuser_cloning.sodium_concentration:
            minimum_cmd += " -sc " + str(amuser_cloning.sodium_concentration)
        if amuser_cloning.primer_concentration:
            minimum_cmd += " -pc " + str(amuser_cloning.primer_concentration)
        if amuser_cloning.circular_input:
            minimum_cmd += " -ci y"
        if amuser_cloning.circular_output:
            minimum_cmd += " -co y"

        return minimum_cmd

    def create_biopy_list(self, genbank_dict, project):
        # get the basename for the file
        sorted_ice_name = [
            part.ice_name for part in project.part_list]
        biopy_list = [genbank_dict[ice_name] for ice_name in sorted_ice_name]
        return biopy_list

    def write_to_fasta_tempfile(self, biopy_list):
        # Truncates the tempfile so it can be reused
        self._fasta_named_tempfile.seek(0)
        self._fasta_named_tempfile.truncate()
        SeqIO.write(biopy_list,
                    self._fasta_named_tempfile, "fasta")
        self._fasta_named_tempfile.seek(0)
        return self._fasta_named_tempfile

    def write_to_phuser_report_file(self, cmd_string):
        # Write to phuser file
        self._phuser_report_tempfile.seek(0)
        self._phuser_report_tempfile.truncate()
        p = Popen(shsplit(cmd_string), stdout=PIPE,
                  stderr=PIPE)
        # TODO: Error messages from amuser should be communicated to the user
        r = p.communicate()
        self._phuser_report_tempfile.seek(0)
        return self._phuser_report_tempfile

    @property
    def report_flat_dict(self, report):
        '''Write the report dictionary as csv'''
        # flatten the dictionary
        for i, d in enumerate(report):
            flat_d = {}
            for dir_key, dir_val in d.items():
                prefix = dir_key.replace('primer', '')
                for prim_key, prim_val in dir_val.items():
                    flat_d[prefix + prim_key] = prim_val
            report[i] = flat_d

        return report
