# admin.py

from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_staff', 'is_active')
    search_fields = ['username']

admin.site.register(CustomUser,CustomUserAdmin)
