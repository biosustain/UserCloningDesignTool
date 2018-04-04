from django.db import models
from django.contrib.auth.models import User
from ice import comm, settings


# Create your models here.
class IceDatabase(models.Model):
    '''Handles all settings and communication for the ice database'''
    USER_NAME = models.CharField(max_length=50, blank=True)
    PASSWORD = models.CharField(max_length=50, blank=True)
    API_USER = models.CharField(max_length=50, blank=True, default="UCloning")
    API_KEY = models.CharField(
        max_length=50, default="3mEya8B8VjYKsLWuoQoNhaAjLmgxYGITECvpEG/CYdg=")
    HOST = models.CharField(
        max_length=50, default='ice-1.ice.ba5123dc.cont.dockerapp.io')
    PORT = models.IntegerField(default=32832)


class IceUserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # NOTE: The ice_token field is set in the login signal found in signals.py
    ice_token = models.CharField(max_length=50, blank=True, null=True)
    ice_host = models.CharField(max_length=50, default='ice.ebdrup.biosustain.dtu.dk')
    ice_port = models.IntegerField(default=443)

    _ice_comm = None

    @property
    def ice_comm(self):
        if not self._ice_comm:
            setting = {
                "HOST": self.ice_host,
                "PORT": self.ice_port,
            }
            ice_setting = settings.IceSettings(setting)
            ice_comm = comm.IceCommunication(ice_setting)
            ice_comm.token = self.ice_token
            self._ice_comm = ice_comm
        return self._ice_comm
