from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Skill(models.Model):
    PYTHON = "Python"
    JAVASCRIPT = "JavaScript"
    JAVA = "Java"
    CSHARP = "C#"
    SQL = "SQL"
    HTML_CSS = "HTML/CSS"

    SKILL_CHOICES = [
        (PYTHON, "Python"),
        (JAVASCRIPT, "JavaScript"),
        (JAVA, "Java"),
        (CSHARP, "C#"),
        (SQL, "SQL"),
        (HTML_CSS, "HTML/CSS"),
    ]

    name = models.CharField(max_length=255, choices=SKILL_CHOICES)

    def __str__(self):
        return self.name


class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    applicants = models.ManyToManyField(
        User, through="Application", related_name="applied_jobs"
    )
    skills_required = models.ManyToManyField(Skill)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.FileField(upload_to="resumes/")
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="pending")
