from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from django.utils.translation import gettext as _
from django.core.cache import cache
from .models import Application, Job

@receiver(post_save, sender=Application)
def application_created(sender, instance, created, **kwargs):
    if created:
        job = instance.job
        posted_by = job.posted_by
        applicant = instance.applicant

        # Email to the person who posted the job
        subject_posted_by = _('New Job Application for {job_title}').format(job_title=job.title)
        message_posted_by = _(
            'Hello {posted_by},\n\n'
            'A new job application has been submitted for the job titled "{job_title}".\n\n'
            'Applicant Details:\n'
            'Name: {applicant_name}\n'
            'Email: {applicant_email}\n\n'
            'Thank you for using our Job Portal!\n\n'
            'Best regards,\n'
            'Techleadz Job Portal Team'
        ).format(
            posted_by=posted_by.username,
            job_title=job.title,
            applicant_name=applicant.username,
            applicant_email=applicant.email,
        )

        send_mail(
            subject_posted_by,
            message_posted_by,
            'from@example.com',
            [posted_by.email],
            fail_silently=False,
        )

        # Email to the applicant
        subject_applicant = _('Job Application Submitted for {job_title}').format(job_title=job.title)
        message_applicant = _(
            'Hello {applicant_name},\n\n'
            'You have successfully applied for the job titled "{job_title}".\n\n'
            'Thank you for using our Job Portal!\n\n'
            'Best regards,\n'
            'Techleadz Job Portal Team'
        ).format(
            applicant_name=applicant,
            job_title=job.title,
        )

        send_mail(
            subject_applicant,
            message_applicant,
            'from@example.com',
            [applicant.email],
            fail_silently=False,
        )


# @receiver([post_save, post_delete], sender=Job)
# def invalidate_job_list_cache(sender, **kwargs):
#     cache_key = f'job_list_{kwargs["instance"].posted_by.id}'
#     cache.delete(cache_key)

