from django.db import models
from django.contrib.auth.models import User

from .CombinatorialProject import CombinatorialProject
from .AmuserCloning import AmuserCloning


class Project(models.Model):
    name = models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    description = models.TextField(default='', blank=True)
    ice_id = models.PositiveIntegerField(default=0, blank=True)
    amusercloning = models.OneToOneField(AmuserCloning, related_name='project', on_delete=models.CASCADE)
    combinatorial = models.ForeignKey(CombinatorialProject, blank=True, null=True, related_name='projects', on_delete=models.CASCADE)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return(self.name)

    class Meta:
        ordering = ['created_date']

    @property
    def part_ice_id_list(self):
        '''Returns all unique ice parts needed for this project'''
        return list(set([part.ice_id for part in self.part_list]))

    @property
    def part_list(self):
        '''Returns the biopython object for each part'''
        return self.parthandler.part_list
