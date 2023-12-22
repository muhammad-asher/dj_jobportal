from rest_framework import serializers
from .models import Job, Application, Skill
from django.contrib.auth import get_user_model
from apps.core.serializers import UserCreateSerializer
User = get_user_model()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):
    skills_required = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    applicant = serializers.ReadOnlyField(source='applicant.username')
    class Meta:
        model = Application
        fields = "__all__"


class JobDetailSerializer(serializers.ModelSerializer):
    applicants = UserCreateSerializer(many=True,read_only=True)
    posted_by = UserCreateSerializer(read_only=True)
    skills_required = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Job
        fields = "__all__"
