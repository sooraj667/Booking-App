from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path("signup/",Signup.as_view(),name="Signup"),
    path("login/",Login.as_view(),name="Login"),
    path("changeimage/",Changeimage.as_view(),name="Changeimage"),
    path("addnewservice/",Addnewservice.as_view(),name="Addnewservice"),
    path("editdetails/",Editdetails.as_view(),name="Editdetails"),
    
]