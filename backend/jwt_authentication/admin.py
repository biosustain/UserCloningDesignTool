from django.contrib import admin
from .models import IceUserProfile, IceDatabase

# Register your models here.
admin.site.register(IceDatabase)
admin.site.register(IceUserProfile)
