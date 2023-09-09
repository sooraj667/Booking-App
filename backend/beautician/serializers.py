from rest_framework.serializers import ModelSerializer
from .models import *


class BeauticianSerializer(ModelSerializer):
    class Meta:
        model=Beautician
        fields= "__all__"