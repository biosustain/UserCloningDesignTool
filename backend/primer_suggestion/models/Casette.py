from django.db import models
from django.contrib.auth.models import User


class Casette(models.Model):
    '''Casettes used for PHUSER'''
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    cmd_string = models.CharField(max_length=100)
    user = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.CASCADE)
