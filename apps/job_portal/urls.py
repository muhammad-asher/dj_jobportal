# job_portal/urls.py
from django.urls import path
from .views import job_cache_list, create_job, apply_for_job, job_detail, JobListView, ApplicationListView

urlpatterns = [
    path('jobs/', job_cache_list, name='job-cache-list'),
    path('create-job/', create_job, name='create-job'),
    path('apply/<int:job_id>/', apply_for_job, name='apply-for-job'),
    path('job/<int:job_id>/', job_detail, name='job-detail'),
    path('jobs-list/', JobListView.as_view(), name='job-list-view'),
    path('applications-list/', ApplicationListView.as_view(), name='application-list-view'),
]
