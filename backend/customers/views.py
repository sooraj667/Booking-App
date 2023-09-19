from rest_framework.response import Response 
from rest_framework.views import APIView
from .models import *
from .serializers import Customerserializer
from rest_framework_simplejwt.tokens import RefreshToken
from beautician.models import *
from beautician.serializers import *
from datetime import datetime
class Signup(APIView):
    def post(self,request):
        pname=request.data.get("pname")
        email=request.data.get("email")
        phone=request.data.get("phone")
        password=request.data.get("password")

        newobj=Customer.objects.create(name=pname,email=email,phone=phone,password=password)
        serialized_object=Customerserializer(newobj)
        return Response({"message":'Created',"beautdata":serialized_object.data})
    
    
class Login(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")

        found=Customer.objects.filter(email=email,password=password).count()    
        if found==1:
            obj=Customer.objects.get(email=email,password=password)
            serialized_object=Customerserializer(obj)
            allbeauticians=Beautician.objects.all()
           
            allbeauticians_serialized=BeauticianSerializer(allbeauticians,many=True)
           
            for item in allbeauticians:
                required_id=item.id
                expertinobj=item.expertin 
                for item in allbeauticians_serialized.data:
                    if item["id"]==required_id:
                        item["expertin"]=ServicesSerializer(expertinobj).data
                
            refresh=RefreshToken.for_user(obj)  
            return Response({"message":'Matched',"custdata":serialized_object.data,"allbeautdata":allbeauticians_serialized.data,"accesstoken":str(refresh.access_token),"refreshtoken":str(refresh)})
        else:
            return Response({"message":'NotMatched'})
        

class Changeimage(APIView):
    def post(self,request):
        print("REACHED")
        id=request.data.get("id")
        image=request.data.get("imageurl")
        print(image,"#########")
        

        obj=Customer.objects.get(id=id)  
        if obj:
            obj.image=image
            obj.save()
            serialized_object=Customerserializer(obj)
            
            return Response({"message":'Added',"custdata":serialized_object.data})
        else:
            return Response({"message":'NotAdded'})
        

class Booknow(APIView):
    def post(self,request):
        print("REACHEDDDDDDDDDD")
        beautid=request.data.get("beautid")
        custid=request.data.get("custid")
        date=request.data.get("date")
        time=request.data.get("time")
        studio=request.data.get("studio")
        servicename=request.data.get("servicename")

        beautobj=Beautician.objects.get(id=beautid)
        custobj=Customer.objects.get(id=custid)
        parseddateandtime=datetime.fromisoformat(str(date))
        parseddate=parseddateandtime.date()
        studioobj=Studio.objects.get(beautician=beautobj,place=studio)
        print(studioobj,"############")
        service_obj=Services.objects.get(name=servicename)
        service_obj_req=Servicefees.objects.get(beautician=beautobj,service=service_obj)
        
        try:
            Blockeddate.objects.get(beautician=beautobj,date=parseddate)
            return Response({"message":'Date is Blocked'})
        except:
            parsed_time = datetime.strptime(time, "%I:%M %p").time()
         

            Appointment.objects.create(customer=custobj,beautician=beautobj,date=parseddate,time=parsed_time,studio=studioobj,service=service_obj_req)
            return Response({"message":'Appointmentdone'})

        
   
        

class Getbeautdatas(APIView):
    def post(self,request):
        print("REACHEDDDDDDDDDD")
        beautid=request.data.get("beautid")
        print(beautid,"BEAUTID")
        try:
            beautobj=Beautician.objects.get(id=beautid)
            studioobjs=Studio.objects.filter(beautician=beautobj)
            studioobjs_serialized=StudioSerializer(studioobjs,many=True)

            serviceobjs=Servicefees.objects.filter(beautician=beautobj)
            serviceobjs_serialized=ServicefeesSerializer(serviceobjs,many=True)
            # for item in serviceobjs:
            #     req_service=item.service
            #     for i in serviceobjs_serialized.data:
            #         if i["service"]==req_service.id:
            #             Service
                        

                
            

            # print(studioobjs_serialized.data,"STUDIOS")
            return Response({"message":"success","studiodata":studioobjs_serialized.data,"servicedata":serviceobjs_serialized.data})
        except:
            return Response({"message":"not success"})

        
        

        

        
