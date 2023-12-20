# Generated by Django 5.0 on 2023-12-20 09:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_portal', '0002_alter_application_job'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Python', 'Python'), ('JavaScript', 'JavaScript'), ('Java', 'Java'), ('C#', 'C#'), ('SQL', 'SQL'), ('HTML/CSS', 'HTML/CSS')], max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='application',
            name='status',
            field=models.CharField(default='pending', max_length=20),
        ),
        migrations.AddField(
            model_name='job',
            name='applicants',
            field=models.ManyToManyField(related_name='applied_jobs', through='job_portal.Application', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='job',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='job_portal.job'),
        ),
        migrations.AddField(
            model_name='job',
            name='skills_required',
            field=models.ManyToManyField(to='job_portal.skill'),
        ),
    ]
