from django.db import models





class Services(models.Model):
    name=models.CharField(max_length=200)
    description=models.CharField(max_length=200)
    is_available=models.BooleanField(default=True)
    image=models.CharField(max_length=350,blank=True,null=True)

    def __str__(self):
        return f"{self.name} - {self.description} "
    

class Beautician(models.Model):
    name=models.CharField(max_length=200)
    email=models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    image=models.CharField(max_length=300,blank=True,null=True)
    expertin=models.ForeignKey(Services,on_delete=models.CASCADE,related_name='beauticians_expert_in',blank=True,null=True)
    services=models.ManyToManyField(Services,related_name='beauticians_providing_services')
   

    def __str__(self):
        return f"{self.name} - {self.email} - {self.phone}"