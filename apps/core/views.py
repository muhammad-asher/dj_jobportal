from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from django.core.mail import send_mail


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)

            # Send welcome email to the user
            send_mail(
                'Welcome to YourSite',
                'Thank you for registering!',
                'test@project.com',  # Sender's email
                [user.email],
                fail_silently=False,
            )

            messages.success(request, 'Registration successful. Welcome!')
            return redirect('home')
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Login successful. Welcome back!')
            return redirect('home')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})


def user_logout(request):
    logout(request)
    messages.info(request, 'Logged out successfully.')
    return redirect('login')


def home(request):
    return render(request, 'home.html')
