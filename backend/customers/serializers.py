from rest_framework.serializers import ModelSerializer,Serializer,DictField
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


class Reviewserializer(ModelSerializer):
    beautician=BeauticianSerializer()
    customer=Customerserializer()


    class Meta:
        model=Review
        fields= "__all__"

class FavouriteStylistsSerializer(ModelSerializer):
    beautician=BeauticianSerializer()
    customer=Customerserializer()


    class Meta:
        model=FavouriteStylists
        fields= "__all__"


class RankingDictSerializer(Serializer):
    first = DictField()
    second = DictField()
    third = DictField()