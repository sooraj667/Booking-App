from django.db import models





class Services(models.Model):
    name=models.CharField(max_length=200)
    description=models.CharField(max_length=200)
    is_available=models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.description} "
    

class Beautician(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    services=models.ManyToManyField(Services)

    def __str__(self):
        return f"{self.name} - {self.email} - {self.phone}"