import re
import json

# NOTE: an entire class might be overkill. If performance drops try to profile this
class AmuserParser(object):
    '''Bundled functions to parse the amuser report into different formats'''

    def __init__(self, report):
        super(AmuserParser, self).__init__()
        self.report = report

    def get_text_inbetween(self, first, second):
        reg_str = "(?ms)({}.*?{}.*?$)".format(first, second)
        return re.findall(reg_str, self.report)

    def _detail_text_to_dict(self, text_list):
        return {
            'sequence': text_list[0].split()[-1],
            'Tm': float(text_list[1].split()[1][:-1]),
            'GC_content_percent': float(text_list[2].split()[2][:-1]),
            'GC_clamp': (text_list[3].split()[-1] == '...YES'),
            'Over_3_gc': (text_list[4].split()[-1] == '...YES'),
            'risk_primer_dimer': (text_list[5].split()[-1] == '...YES'),
            'risk_intraprimer': (text_list[6].split()[-1] == '...YES'),
            'polyN_stretch': (text_list[7].split()[-1] == '...YES')
        }

    def _get_primer_details(self):
        m = self.get_text_inbetween('primer details for', 'Tm of primers')
        l = []
        for p in m:
            p = p.replace('* ', '').splitlines()
            d = {
                'name': p[0][19:],
                'forward_primer': self._detail_text_to_dict(p[2:11]),
                'backward_primer': self._detail_text_to_dict(p[11:21])
            }
            l.append(d)
        return l

    def sequence(self):
        r = ''.join(re.findall('([0-9]+\s{2,}.*)', self.report))
        r = re.sub('[0-9]', '', r)
        r = r.replace(' ', '')
        return r

    def to_json(self):
        return json.loads(self.to_dict())

    def to_dict(self):
        d = {'primers': self._get_primer_details()}
        d['sequence'] = self.sequence()
        return d
