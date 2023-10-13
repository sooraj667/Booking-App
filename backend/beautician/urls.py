from django.contrib import admin
from django.urls import path
from .views import *
urlpatterns = [
    path("signup/",Signup.as_view(),name="Signup"),
    path("login/",Login.as_view(),name="Login"),
    path("changeimage/",Changeimage.as_view(),name="Changeimage"),
    path("addnewservice/",Addnewservice.as_view(),name="Addnewservice"),
    path("editdetails/",Editdetails.as_view(),name="Editdetails"),
    path("getbookings/",Getbookings.as_view(),name="Getbookings"),
    path("getstudios/",Getstudios.as_view(),name="Getstudios"),
    path("addstudio/",Addstudio.as_view(),name="Addstudio"),
    path("editstudio/",Editstudio.as_view(),name="Editstudio"),
    path("deletestudio/",Deletestudio.as_view(),name="Deletestudio"),
    path("confirmotp/",Confirmotp.as_view(),name="Confirmotp"),
    path("todays-schedule/",Todaysschedule.as_view(),name="Todaysschedule"),
    path("forgotpassword/",Forgotpassword.as_view(),name="Forgotpassword"),
    path("changepassword/",ChangePassword.as_view(),name="ChangePassword"),

    
]