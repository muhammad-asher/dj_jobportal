from django.apps import AppConfig


class JobPortalConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.job_portal'

    def ready(self):
        import apps.job_portal.signals