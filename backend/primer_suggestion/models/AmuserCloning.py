from django.db import models
from model_utils import Choices
from django.core.validators import MaxValueValidator, MinValueValidator

from .Casette import Casette


class AmuserCloning(models.Model):
    NONE = 0
    EQ = 1
    MANUAL = 2
    STRATEGY = Choices(
        (NONE, 'none', 'none'),
        (EQ, 'eq', 'eq'),
        (MANUAL, 'manual', 'manual'),
    )

    temperature_option = models.IntegerField(
        choices=STRATEGY, default=NONE
    )
    melting_temperature = models.FloatField(
        blank=True,
        null=True,
        validators=[MaxValueValidator(90), MinValueValidator(30)]
    )
    sodium_concentration = models.FloatField(
        blank=True,
        null=True)
    primer_concentration = models.FloatField(
        blank=True,
        null=True)
    circular_input = models.BooleanField(blank=True, default=False)
    circular_output = models.BooleanField(blank=True, default=False)
    casette = models.ForeignKey(Casette, blank=True, null=True)

    def __str__(self):
        if hasattr(self, 'project'):
            return self.project.name
        elif hasattr(self, 'combinatorial'):
            return self.combinatorial.name
        else:
            return 'No relation found'
