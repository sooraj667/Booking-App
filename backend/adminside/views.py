from rest_framework.response import Response 
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import Usermodelserializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from beautician.models import Beautician
from beautician.serializers import BeauticianSerializer


class Login(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")
        print(email,password,"#############33")
        print("OKKOKOKOKOKOKKOk")
        found=User.objects.filter(email=email)
        print(found)
        hashedpassword=found[0].password
        matched = check_password(password, hashedpassword)
        print("MATCHED",matched)
        
       
           
        if matched==True:

            obj=User.objects.get(email=email)
            serialized_object=Usermodelserializer(obj)
            print(serialized_object,"PRIRIRIRIIR")
            

            allbeautdatas=Beautician.objects.all()
            allbeautdatas=BeauticianSerializer(allbeautdatas,many=True)
            print(allbeautdatas,"IIIIIIIIIIIIIIIIIIIIIIIII")

            refresh=RefreshToken.for_user(obj)  
            return Response({"message":'Matched',"admindata":serialized_object.data,"allbeautdatas":allbeautdatas.data,"accesstoken":str(refresh.access_token),"refreshtoken":str(refresh)})
        else:
            return Response({"message":'NotMatched'})