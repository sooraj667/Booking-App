from rest_framework.serializers import ModelSerializer
from .models import *


class Customerserializer(ModelSerializer):
    class Meta:
        model=Customer
        fields= "__all__"