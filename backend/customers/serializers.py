from rest_framework.serializers import ModelSerializer
from .models import *


class Customerserializer(ModelSerializer):
    class Meta:
        model=Customer
        fields= "__all__"

class Appointmentserializer(ModelSerializer):
    class Meta:
        model=Appointment
        fields= "__all__"