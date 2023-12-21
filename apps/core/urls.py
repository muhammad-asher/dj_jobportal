from django.views.generic import TemplateView
from django.urls import path
from .views import register, user_login, home,UserLogoutView
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)

urlpatterns = [
    path("", TemplateView.as_view(template_name="base.html")),
    path("register/", register, name="register"),
    path("login/", user_login, name="login"),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),

    path("home/", home, name="home"),
    path("password_reset/", PasswordResetView.as_view(), name="password_reset"),
    path(
        "password_reset/done/",
        PasswordResetDoneView.as_view(),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        PasswordResetCompleteView.as_view(),
        name="password_reset_complete",
    ),
]
