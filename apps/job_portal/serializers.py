from rest_framework import serializers
from .models import Job, Application, Skill
from django.contrib.auth import get_user_model

User = get_user_model()

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    skills_required = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    class Meta:
        model = Application
        fields = '__all__'

class JobDetailSerializer(serializers.ModelSerializer):
    applicants = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = '__all__'

    def get_applicants(self, obj):
        applications = Application.objects.filter(job=obj)
        return ApplicationSerializer(applications, many=True).data
