from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path("signup/",Signup.as_view(),name="Signup"),
    path("login/",Login.as_view(),name="Login"),
    path("changeimage/",Changeimage.as_view(),name="Changeimage"),
    path("booknow/",Booknow.as_view(),name="Booknow"),
    path("getbeautdatas/",Getbeautdatas.as_view(),name="Getbeautdatas"),
    path("getbookings/",Getbookings.as_view(),name="Getbookings"),
    path("getlandingpage/",Getlandingpage.as_view(),name="Getlandingpage"),
    path("editdetails/",Editdetails.as_view(),name="Editdetails"),
    path("getallservices/",Getallservices.as_view(),name="Getallservices"),


    
    
]