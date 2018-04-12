from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField


class Casette(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    cmd_string = models.CharField(max_length=100)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)


class AmuserCloning(models.Model):
    STRATEGY = (
        (0, 'none'),
        (1, 'eq'),
        (2, 'manual'),
    )

    temperature_option = models.IntegerField(choices=STRATEGY, default=0)
    melting_temperature = models.FloatField(blank=True, null=True, validators=[MaxValueValidator(90), MinValueValidator(30)])
    sodium_concentration = models.FloatField(blank=True, null=True)
    primer_concentration = models.FloatField(blank=True, null=True)
    circular_input = models.BooleanField(blank=True, default=False)
    circular_output = models.BooleanField(blank=True, default=False)
    casette = models.ForeignKey(Casette, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        if hasattr(self, 'project'):
            return self.project.name
        elif hasattr(self, 'combinatorial'):
            return self.combinatorial.name
        else:
            return 'No relation found'


class CombinatorialProject(models.Model):
    name = models.CharField(max_length=50)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    parts = JSONField(default=dict)
    amusercloning = models.OneToOneField(AmuserCloning, related_name='combinatorial', on_delete=models.CASCADE)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_date']

    @property
    def part_ice_id_list(self):
        '''Returns the biopython object for each part'''
        return [ice_id for project in self.projects.all() for ice_id in project.part_ice_id_list]


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
