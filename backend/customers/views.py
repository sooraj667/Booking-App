from rest_framework.response import Response 
from rest_framework.views import APIView
from .models import Appointment
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from beautician.models import *
from beautician.serializers import *
from datetime import datetime
from datetime import date
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
import random


def generate_otp():
    return str(random.randint(1000, 9999))



class Confirmotp(APIView):
    def post(self,request):
        user_entered_otp=request.data.get("otp")
        email=request.data.get("email")
        try:
            otpobj=OTP.objects.get(otp=user_entered_otp,email=email)
            otpobj.delete()
            return Response({"message":'Success'}) 
        except:
            return Response({"message":'Failed'})

class Signup(APIView):
    def post(self,request):
        pname=request.data.get("pname")
        email=request.data.get("email")
        phone=request.data.get("phone")
        password=request.data.get("password")

        try:
            check_obj=Customer.objects.get(email=email)
            return Response({"message":'Email-Failed'}) 
        except:
            pass

        try:
            check_obj=Customer.objects.get(phone=phone)
            return Response({"message":'Phone-Failed'}) 
        except:
            pass

        otpvalue=generate_otp()
        OTP.objects.create(otp=otpvalue,email=email)
      
        subject = "OTP for registration in Groom UP"
        message = f"Your OTP for registration is {otpvalue}.Please enter this otp to register."
        recipient = email
        send_mail(subject, 
              message, settings.EMAIL_HOST_USER, [recipient], fail_silently=False)

        hashed_password=make_password(password)

        newobj=Customer.objects.create(name=pname,email=email,phone=phone,password=hashed_password)
        serialized_object=Customerserializer(newobj)
        return Response({"message":'Created',"beautdata":serialized_object.data})
    
    
class Login(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")
        try:
            custobj=Customer.objects.get(email=email)
        except:
            return Response({"message":'NotMatched'})

        valid=check_password(password,custobj.password)

        if not valid:
            return Response({"message":'NotMatched'})


        found=Customer.objects.filter(email=email).count()    
        if valid:
            
            serialized_object=Customerserializer(custobj)
            allbeauticians=Beautician.objects.all()
           
            allbeauticians_serialized=BeauticianSerializer(allbeauticians,many=True)
           
            # for item in allbeauticians:
            #     required_id=item.id
            #     expertinobj=item.expertin 
            #     for item in allbeauticians_serialized.data:
            #         if item["id"]==required_id:
            #             item["expertin"]=ServicesSerializer(expertinobj).data
                
            refresh=RefreshToken.for_user(custobj)  
            return Response({"message":'Matched',"custdata":serialized_object.data,"allbeautdata":allbeauticians_serialized.data,"accesstoken":str(refresh.access_token),"refreshtoken":str(refresh)})
        else:
            return Response({"message":'NotMatched'})
        

class Changeimage(APIView):
    def post(self,request):
     
        id=request.data.get("id")
        image=request.data.get("imageurl")

        

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
        print("VIEW REACHEDDDDDDDDDDDD NEWWEWEWE")
        beautid=request.data.get("beautid")
        custid=request.data.get("custid")
        date=request.data.get("date")
        time=request.data.get("time")
        studio=request.data.get("studio")
        servicename=request.data.get("servicename")


        


        beautobj=Beautician.objects.get(id=beautid)
        custobj=Customer.objects.get(id=custid)


        date_format = '%a %b %d %Y %H:%M:%S GMT%z (%Z)'
        parseddateandtime = datetime.strptime(date, date_format)

        
        parseddate=parseddateandtime.date()
        studioobj=Studio.objects.get(beautician=beautobj,place=studio)

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
  
        beautid=request.data.get("beautid")
      
        try:
            beautobj=Beautician.objects.get(id=beautid)
            studioobjs=Studio.objects.filter(beautician=beautobj)
            studioobjs_serialized=StudioSerializer(studioobjs,many=True)

            serviceobjs=Servicefees.objects.filter(beautician=beautobj)
            serviceobjs_serialized=ServicefeesSerializer(serviceobjs,many=True)

            for item in serviceobjs:
                req_service=item.service
                serviceid=req_service.id
                for item in serviceobjs_serialized.data:
                    if item["service"]==serviceid:
                        item["service"]=ServicesSerializer(req_service).data
                        

                
            

            # print(studioobjs_serialized.data,"STUDIOS")
            return Response({"message":"success","studiodata":studioobjs_serialized.data,"servicedata":serviceobjs_serialized.data})
        except:
            return Response({"message":"not success"})

        
        

        
class Getbookings(APIView):
    def post(self,request):
 
        custid=request.data.get("custid")

        try:
            custobj=Customer.objects.get(id=custid)
  
            appointmentsobjs=Appointment.objects.filter(customer=custobj)
            appointmentsobjs_serialized=Appointmentserializer(appointmentsobjs,many=True)

            # studioobjs=Studio.objects.filter(beautician=beautobj)
            # studioobjs_serialized=StudioSerializer(studioobjs,many=True)

            # serviceobjs=Servicefees.objects.filter(beautician=beautobj)
            # serviceobjs_serialized=ServicefeesSerializer(serviceobjs,many=True)
   
     
            for item in appointmentsobjs:
                serviceobj=item.service
                beauticianobj=item.beautician
                studioobj=item.studio

                baseservice=serviceobj.service
                baseservice_serialized=ServicesSerializer(baseservice)
               
                

                serviceobj_serialized=ServicefeesSerializer(serviceobj)
                beauticianobj_serialized=BeauticianSerializer(beauticianobj)
                studioobj_serialized=StudioSerializer(studioobj)
                

                
                
                serviceid=serviceobj.id
                beauticianid=beauticianobj.id
                studioid=studioobj.id
               
                for item in appointmentsobjs_serialized.data:
                    if item["service"]==serviceid:
                        item["service"]=serviceobj_serialized.data
                        item["service"]["service"]=baseservice_serialized.data
                    if  item["beautician"]==beauticianid:
                        item["beautician"]=beauticianobj_serialized.data
                    if  item["studio"]==studioid:
                        item["studio"]=studioobj_serialized.data


                

                        

                
            print(appointmentsobjs_serialized.data)

            # print(studioobjs_serialized.data,"STUDIOS")
            return Response({"message":"success","appointmentdata":appointmentsobjs_serialized.data})
        except:
            return Response({"message":"not success"})
        
class Getlandingpage(APIView):
    def post(self,request):
        print("LANDINGG")
        custid=request.data.get("custid")
       
        try:
            custobj=Customer.objects.get(id=custid)
            
            print(date.today())
            appointmentsobjs=Appointment.objects.filter(customer=custobj,date=date.today())
            
            appointmentsobjs_serialized=Appointmentserializer(appointmentsobjs,many=True)

            # studioobjs=Studio.objects.filter(beautician=beautobj)
            # studioobjs_serialized=StudioSerializer(studioobjs,many=True)

            # serviceobjs=Servicefees.objects.filter(beautician=beautobj)
            # serviceobjs_serialized=ServicefeesSerializer(serviceobjs,many=True)
            print("ALLSET")
            print(appointmentsobjs,"LOOKKKKKKKKKKKKK")
            for item in appointmentsobjs:
                serviceobj=item.service
                beauticianobj=item.beautician
                studioobj=item.studio

                baseservice=serviceobj.service
                baseservice_serialized=ServicesSerializer(baseservice)
                print(f"{serviceobj},{beauticianobj},{studioobj} ############3")
                

                serviceobj_serialized=ServicefeesSerializer(serviceobj)
                beauticianobj_serialized=BeauticianSerializer(beauticianobj)
                studioobj_serialized=StudioSerializer(studioobj)
                

                
                
                serviceid=serviceobj.id
                beauticianid=beauticianobj.id
                studioid=studioobj.id
               
                for item in appointmentsobjs_serialized.data:
                    if item["service"]==serviceid:
                        item["service"]=serviceobj_serialized.data
                        item["service"]["service"]=baseservice_serialized.data
                    if  item["beautician"]==beauticianid:
                        item["beautician"]=beauticianobj_serialized.data
                    if  item["studio"]==studioid:
                        item["studio"]=studioobj_serialized.data


                

                        

                
            print(appointmentsobjs_serialized.data)

            # print(studioobjs_serialized.data,"STUDIOS")
            return Response({"message":"success","todays_appointmentdata":appointmentsobjs_serialized.data})
        except:
            return Response({"message":"not success"})
        


class Editdetails(APIView):
    def post(self,request): 
        id=request.data.get("id")
        name=request.data.get("name")
        email=request.data.get("email")
        phone=request.data.get("phone")
        custobj=Customer.objects.get(id=id)
        custobj.name=name
        custobj.email=email
        custobj.phone=phone 
        custobj.save()
        customer_serialized=Customerserializer(custobj)
        return Response({"message":'Added',"allcustdatas":customer_serialized.data})
    
class Getallservices(APIView):
    def get(self,request): 
        allservices=Services.objects.all()
        allservices_serialized=ServicesSerializer(allservices,many=True)
        return Response({"message":'Added',"allservices":allservices_serialized.data})
    
class Getsingleservice(APIView):
    def post(self,request): 
        serviceid=request.data.get("serviceid")
        print(serviceid,"PRINTED")
        serviceobj=Services.objects.get(id=serviceid)
        service_serialized=ServicesSerializer(serviceobj)
        return Response({"message":'Added',"service":service_serialized.data})
    


class Getservicebeauts(APIView):
    def post(self,request): 
        serviceid=request.data.get("serviceid")
        serviceobj=Services.objects.get(id=serviceid)
        servicefeesobjs=Servicefees.objects.filter(service=serviceobj,topservice=True)
        servicefeesobjs_serialized=ServicefeesSerializer(servicefeesobjs,many=True)
     

        return Response({"message":'Added',"services":servicefeesobjs_serialized.data})


class Getviewmoreservicebeauts(APIView):
    def post(self,request): 
        serviceid=request.data.get("serviceid")
        serviceobj=Services.objects.get(id=serviceid)
        servicefeesobjs=Servicefees.objects.filter(service=serviceobj).exclude(topservice=True)
        servicefeesobjs_serialized=ServicefeesSerializer(servicefeesobjs,many=True)
     

        return Response({"message":'Added',"services":servicefeesobjs_serialized.data})
    
class Forgotpassword(APIView):
    def post(self,request): 
        email=request.data.get("email")
        try:
            custobj=Customer.objects.get(email=email)
            id=custobj.id
            subject = "Forgot Password"
            message = "http://localhost:3000/forgotpassword/"
            recipient = email
            send_mail(subject, 
                message, settings.EMAIL_HOST_USER, [recipient], fail_silently=False)
            return Response({"message":'success',"id":id})
        except:
            return Response({"message":'failed'})
        

class ChangePassword(APIView):
    def post(self,request): 
        id=request.data.get("id")
        password=request.data.get("password")
       
        
        custobj=Customer.objects.get(id=id)
        custobj.password=make_password(password)
        custobj.save()
        print("Saved")
        return Response({"message":'success'})
       

  
    
        






        