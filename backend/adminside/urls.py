from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path("login/",Login.as_view(),name="Login")
    
]