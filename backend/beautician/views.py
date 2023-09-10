from rest_framework.response import Response 
from rest_framework.views import APIView
from .models import *
from .serializers import BeauticianSerializer,ServicesSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class Signup(APIView):
    def post(self,request):
        pname=request.data.get("pname")
        email=request.data.get("email")
        phone=request.data.get("phone")
        password=request.data.get("password")

        newobj=Beautician.objects.create(name=pname,email=email,phone=phone,password=password)
        serialized_object=BeauticianSerializer(newobj)
        return Response({"message":'Created',"beautdata":serialized_object.data})
    
    
class Login(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")

        found=Beautician.objects.filter(email=email,password=password).count()    
        if found==1:
            obj=Beautician.objects.get(email=email,password=password)
            serialized_object=BeauticianSerializer(obj)
            expertin_serialized=ServicesSerializer(obj.expertin)
            otherservices_serialized=ServicesSerializer(obj.services,many=True)

            refresh=RefreshToken.for_user(obj)  
            return Response({"message":'Matched',"beautdata":serialized_object.data,"expertin":expertin_serialized.data,"services":otherservices_serialized.data,"accesstoken":str(refresh.access_token),"refreshtoken":str(refresh)})
        else:
            return Response({"message":'NotMatched'})



       
class Changeimage(APIView):
    def post(self,request):
        id=request.data.get("id")
        image=request.data.get("imageurl")
        print(image,"#########")
        

        obj=Beautician.objects.get(id=id)  
        if obj:
            obj.image=image
            obj.save()
            serialized_object=BeauticianSerializer(obj)
            
            return Response({"message":'Added',"beautdata":serialized_object.data})
        else:
            return Response({"message":'NotAdded'})







