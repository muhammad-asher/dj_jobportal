from django.contrib import admin
from .models import Job, Application, Skill


class JobAdmin(admin.ModelAdmin):
    list_display = ["title", "posted_by", "created_at"]
    search_fields = ["title"]
    autocomplete_fields = ["posted_by", "skills_required"]


class SkillAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["job", "applicant", "resume", "applied_at", "status"]
    search_fields = ["applied_at"]
    autocomplete_fields = ["applicant", "job"]


admin.site.register(Skill, SkillAdmin)
admin.site.register(Job, JobAdmin)
admin.site.register(Application, ApplicationAdmin)
