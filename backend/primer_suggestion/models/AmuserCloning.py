from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from .Casette import Casette


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
