from django.db import models



class Customer(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    image=models.CharField(max_length=300,blank=True,null=True)


    def __str__(self):
        return f"{self.name} - {self.email} - {self.phone}"
