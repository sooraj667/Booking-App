from rest_framework.response import Response 
from rest_framework.views import APIView
from .models import *
from .serializers import *
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
            beautobj=Beautician.objects.get(email=email,password=password)
            serialized_object=BeauticianSerializer(beautobj)
            expertin_serialized=ServicesSerializer(beautobj.expertin)
            beautservices=Servicefees.objects.filter(beautician=beautobj)
            beautservices_serialized=ServicefeesSerializer(beautservices,many=True)
            allservices_serialized=ServicesSerializer(Services.objects.all(),many=True)

            refresh=RefreshToken.for_user(beautobj)  
            return Response({"message":'Matched',"beautdata":serialized_object.data,"expertin":expertin_serialized.data,"services":beautservices_serialized.data,"allservices":allservices_serialized.data,"accesstoken":str(refresh.access_token),"refreshtoken":str(refresh)})
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
        
class Addnewservice(APIView):
    def post(self,request):
        id=request.data.get("beautid")
        servicename=request.data.get("servicename")
        servicefee=request.data.get("servicefee")
        serviceobj=Services.objects.get(name=servicename)
        beautobj=Beautician.objects.get(id=id)
    

        try:
            beautservices=Servicefees.objects.get(beautician=beautobj,service=serviceobj)
            print("ALREADY PRESENT ####################################")
            return Response({"message":'Already Present'})

        except:
            print("NOT PRESENT")
            
        
        
            

            Servicefees.objects.create(service=serviceobj,beautician=beautobj,servicefee=servicefee)
            beautservices=Servicefees.objects.filter(beautician=beautobj)
            beautservices_serialized=ServicefeesSerializer(beautservices,many=True)
            for item in beautservices:
                req_id=item.id
                for item in beautservices_serialized.data:
                    if item["id"]==req_id:
                        serviceid=item["service"]
                        serviceobj=Services.objects.get(id=serviceid)
                        serviceobj_serialized=ServicesSerializer(serviceobj)
                        item["service"]=serviceobj_serialized.data
            return Response({"message":'Added',"services":beautservices_serialized.data})


                



        
        

        # obj=Beautician.objects.get(id=id)  
        # if obj:
        #     obj.services.add(serviceobj)
        #     obj.save()
        #     services_serialized=ServicesSerializer(obj.services,many=True)
            
        # return Response({"message":'Added',"services":beautservices_serialized.data})
        # else:
        #     return Response({"message":'NotAdded'})
        
class Editdetails(APIView):
    def post(self,request):
        id=request.data.get("id")
        name=request.data.get("name")
        email=request.data.get("email")
        phone=request.data.get("phone")
        beautobj=Beautician.objects.get(id=id)
        beautobj.name=name
        beautobj.email=email
        beautobj.phone=phone
        beautobj.save()
        beautician_serialized=BeauticianSerializer(beautobj)
        return Response({"message":'Added',"allbeautdatas":beautician_serialized.data})



        








