def report_to_csv(report_dict):
    """
    Takes a dictionary of reports and coverts them into a dict used to create a csv file
    :param report_dict:
    :return:
    """

    content = []
    for project_name, report in report_dict.items():
        for primer_set in report['report']['primers']:
            for primer_direction, primer_dict in primer_set.items():
                prefix = primer_direction.replace('_primer', '')
                if primer_direction == 'name':
                    continue
                flat_d = {
                    'project_name': project_name,
                    'primer_name': f"{primer_set['name']}_{prefix}"
                }
                for prim_key, prim_val in primer_dict.items():
                    flat_d[prim_key] = prim_val
                content.append(flat_d)
    return content
