from django.contrib import admin
from .models import Project, Casette, AmuserCloning, CombinatorialProject


# class ProjectInline(admin.TabularInline):
#     model = Project
#     extra = 1


# class AmuserCloningInline(admin.TabularInline):
#     model = AmuserCloning
#     extra = 1


# class ProjectAdmin(admin.ModelAdmin):
#     inlines = [
#         AmuserCloningInline,
#     ]


# class AmuserCloningAdmin(admin.ModelAdmin):
#     inlines = (AmuserCloningInline,)


admin.site.register(AmuserCloning)
admin.site.register(Casette)
admin.site.register(CombinatorialProject)
admin.site.register(Project)
# admin.site.register(ProjectBundle, ProjectAdmin)
