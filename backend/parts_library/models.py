from django.db import models
from primer_suggestion.models import Project
import json

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)


def load_json_object(json_obj):
    try:
        return json.loads(json_obj)
    except ValueError:
        return {'error': 'Could not load json object'}


# Create your models here.
class PartHandler(models.Model):
    '''Intermediary model between the project and class.
    It is here to decouple the project and the parts'''
    _project = models.OneToOneField(Project, related_name='parthandler')

    @property
    def part_list(self):
        return [part for part in self.parts.all().order_by('order')]


class Part(models.Model):
    '''Stores some simple information about the part.'''
    _handler = models.ForeignKey(PartHandler, related_name='parts')
    order = models.PositiveIntegerField()
    ice_id = models.IntegerField()
    ice_name = models.CharField(max_length=200)
    fwd_strand = models.BooleanField(default=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return "Part id {}, Ice id {}".format(self.id, self.ice_id)
