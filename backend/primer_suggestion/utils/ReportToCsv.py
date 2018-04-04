def report_to_csv(report_dict):
    '''Takes a dictionary of reports and coverts them into a dict used to
    create a csv file'''
    content = []
    for project_name, report in report_dict.items():
        for primer_set in report['report']['primers']:
            flat_d = {'Project Name': project_name}
            name = ''
            for primer_direction, primer_dict in primer_set.items():
                prefix = primer_direction.replace('primer', '')
                if primer_direction == 'name':
                    name = primer_dict
                    continue
                flat_d['Primer for'] = prefix + name
                for prim_key, prim_val in primer_dict.items():
                    flat_d[prim_key] = prim_val
            content.append(flat_d)
    return content
