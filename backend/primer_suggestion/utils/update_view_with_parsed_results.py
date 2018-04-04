class UpdateSerializedDataWithResult():
    def __init__(self, report_dict, serialized_data, data_type):
        '''data_type should be either "combinatorial" or "project"'''
        self.report_dict = report_dict
        self.serialized_data = serialized_data
        self.data_type = data_type

    def get_updated_data(self):
        if self.data_type == 'combinatorial':
            updated_data = self.update_combinatorial_data()
        elif self.data_type == 'project':
            updated_data = self.update_project_data()
        return updated_data

    def update_combinatorial_data(self):
        if isinstance(self.serialized_data, list):
            updated_data = []
            for combinatorial in self.serialized_data:
                project_list = self.update_project_list(
                    combinatorial['projects'])
                combinatorial['projects'] = project_list
                updated_data.append(combinatorial)
        else:
            project_list = self.update_project_list(
                self.serialized_data['projects'])
            updated_data = self.serialized_data
            updated_data['projects'] = project_list
        return updated_data

    def update_project_data(self):
        if isinstance(self.serialized_data, list):
            updated_data = self.update_project_list(self.serialized_data)
        else:
            updated_data = self.update_single_project_data(self.serialized_data)

        return updated_data

    def update_project_list(self, project_list):
        updated_project_list = []
        for project in project_list:
            updated_project = self.update_single_project_data(project)
            updated_project_list.append(updated_project)
        return updated_project_list

    def update_single_project_data(self, project):
        project['report'] = self.report_dict[project['name']]['report']
        project['errors'] = self.report_dict[project['name']]['errors']
        return project
