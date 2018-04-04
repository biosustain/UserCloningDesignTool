from django.contrib import admin
from .models import Part, PartHandler


class PartInline(admin.TabularInline):
    model = Part


class PartHandlerAdmin(admin.ModelAdmin):
    inlines = [
        PartInline,
    ]

# Register your models here.
admin.site.register(Part)
admin.site.register(PartHandler, PartHandlerAdmin)
