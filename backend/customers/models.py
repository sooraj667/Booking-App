from django.db import models
from beautician.models import *


class Customer(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    image=models.CharField(max_length=300,blank=True,null=True)
    isblocked=models.CharField(max_length=200,default="False")
    wallet_amount=models.DecimalField(max_digits=10,decimal_places=2)


    def __str__(self):
        return f"{self.name} - {self.email} - {self.phone}"
    


class Appointment(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    beautician=models.ForeignKey(Beautician,on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    studio=models.ForeignKey(Studio,on_delete=models.CASCADE)
    service=models.ForeignKey(Servicefees,on_delete=models.CASCADE)
    booked_timing=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.customer.email} - {self.beautician.name}"




   
