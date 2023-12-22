# job_portal/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from django.core.cache import cache
from django.views.decorators.cache import cache_page

from .pagination import CustomPageNumberPagination
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer, JobDetailSerializer


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
@cache_page(60 * 0.5)  # Cache for 30 seconds
def job_cache_list(request):
    cache_key = f"job_list_{request.user.id}"
    cached_data = cache.get(cache_key)

    if cached_data is not None:
        return Response(cached_data)

    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)

    cache.set(cache_key, serializer.data)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def create_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(posted_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def apply_for_job(request, job_id):
    job = Job.objects.get(pk=job_id)
    applicant = request.user

    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        # Save the job and applicant in the serializer
        serializer.save(job=job, applicant=applicant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def job_detail(request, job_id):
    job = Job.objects.get(pk=job_id)
    serializer = JobDetailSerializer(job)
    return Response(serializer.data)


class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "description", "skills_required__name"]
    ordering_fields = ["created_at", "updated_at"]
    pagination_class = CustomPageNumberPagination


class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["job__title", "status", "applied_at"]
    ordering_fields = ["job__title", "status", "applied_at"]
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Admin user can see all applications
            return Application.objects.all()
        else:
            return Application.objects.filter(applicant=user)
