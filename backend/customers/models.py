from django.db import models
from beautician.models import *


class Customer(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    image=models.CharField(max_length=300,blank=True,null=True)


    def __str__(self):
        return f"{self.name} - {self.email} - {self.phone}"
    


class Appointment(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    beautician=models.ForeignKey(Beautician,on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    studio=models.ForeignKey(Studio,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.customer.email} - {self.beautician.name}"




   
