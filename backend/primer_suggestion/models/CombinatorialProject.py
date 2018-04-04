from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField

from .AmuserCloning import AmuserCloning


class CombinatorialProject(models.Model):
    name = models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    parts = JSONField(default=dict)
    amusercloning = models.OneToOneField(
        AmuserCloning, related_name='combinatorial')
    user = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_date']

    @property
    def part_ice_id_list(self):
        '''Returns the biopython object for each part'''
        return [ice_id for project in self.projects.all()
                for ice_id in project.part_ice_id_list]
