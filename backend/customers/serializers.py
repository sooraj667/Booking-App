from rest_framework.serializers import ModelSerializer
from .models import *
from beautician.serializers import *


class Customerserializer(ModelSerializer):
    class Meta:
        model=Customer
        fields= "__all__"

class Appointmentserializer(ModelSerializer):
    beautician=BeauticianSerializer()
    customer=Customerserializer()
    service=ServicefeesSerializer()
    studio=StudioSerializer()

    class Meta:
        model=Appointment
        fields= "__all__"