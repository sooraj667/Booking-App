from django.contrib import admin
from .models import Customer,Appointment,Review,FavouriteStylists
admin.site.register(Customer)
admin.site.register(Appointment)
admin.site.register(Review)
admin.site.register(FavouriteStylists)