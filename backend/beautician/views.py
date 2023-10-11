from rest_framework.response import Response 
from rest_framework.views import APIView
from .models import *
from .serializers import *
from customers.serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from customers.models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.core.mail import send_mail
from django.conf import settings
import random
from datetime import datetime



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
            check_obj=Beautician.objects.get(email=email)
            return Response({"message":'Email-Failed'}) 
        except:
            pass

        try:
            check_obj=Beautician.objects.get(phone=phone)
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

        newobj=Beautician.objects.create(name=pname,email=email,phone=phone,password=hashed_password)
        serialized_object=BeauticianSerializer(newobj)
        return Response({"message":'Created',"beautdata":serialized_object.data}) 
    
class Login(APIView):
    def post(self,request):
        email=request.data.get("email")
        password=request.data.get("password")
        


        found=Beautician.objects.filter(email=email).count()    
        if found==1:
            beautobj=Beautician.objects.get(email=email)
            is_valid=check_password(password, beautobj.password)
            if not is_valid:
                return Response({"message":'NotMatched'})
            
            # beautobj=Beautician.objects.get(email=email,password=password)
            
            print(beautobj)
            if beautobj.isblocked==True:
                print("ISBLOCKED TRUE")
                return Response({"message":'Blocked'})
            serialized_object=BeauticianSerializer(beautobj)
            
            beautservices=Servicefees.objects.filter(beautician=beautobj)
            beautservices_serialized=ServicefeesSerializer(beautservices,many=True)
            for item in beautservices:
                serviceobj=item.service
                for item in beautservices_serialized.data:
                    if item["service"]==serviceobj.id:
                        item["service"]=ServicesSerializer(serviceobj).data
                

            allservices_serialized=ServicesSerializer(Services.objects.all(),many=True)


            studioobjs=Studio.objects.filter(beautician=beautobj)
            studioobjs_serialized=StudioSerializer(studioobjs,many=True)



           
           


            refresh=RefreshToken.for_user(beautobj)  
            return Response({"message":'Matched',"beautdata":serialized_object.data,"services":beautservices_serialized.data,"allservices":allservices_serialized.data,"studios":studioobjs_serialized.data,"accesstoken":str(refresh.access_token),"refreshtoken":str(refresh)})
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
            # for item in beautservices:
            #     req_id=item.id
            #     for item in beautservices_serialized.data:
            #         if item["id"]==req_id:
            #             serviceid=item["service"]
            #             serviceobj=Services.objects.get(id=serviceid)
            #             serviceobj_serialized=ServicesSerializer(serviceobj)
            #             item["service"]=serviceobj_serialized.data
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
    


class Getbookings(APIView):
    def post(self,request):
 
        beautid=request.data.get("beautid")

        try:
            beautobj=Beautician.objects.get(id=beautid)
  
            appointmentsobjs=Appointment.objects.filter(beautician=beautobj)
            appointmentsobjs_serialized=Appointmentserializer(appointmentsobjs,many=True)

            # studioobjs=Studio.objects.filter(beautician=beautobj)
            # studioobjs_serialized=StudioSerializer(studioobjs,many=True)

            # serviceobjs=Servicefees.objects.filter(beautician=beautobj)
            # serviceobjs_serialized=ServicefeesSerializer(serviceobjs,many=True)
   
     
            for item in appointmentsobjs:
                serviceobj=item.service
                customerobj=item.customer
                studioobj=item.studio

                baseservice=serviceobj.service
                baseservice_serialized=ServicesSerializer(baseservice)
               
                

                serviceobj_serialized=ServicefeesSerializer(serviceobj)
                customerobj_serialized=Customerserializer(customerobj)
                studioobj_serialized=StudioSerializer(studioobj)
                

                
                
                serviceid=serviceobj.id
                customerid=customerobj.id
                studioid=studioobj.id
               
                for item in appointmentsobjs_serialized.data:
                    if item["service"]==serviceid:
                        item["service"]=serviceobj_serialized.data
                        item["service"]["service"]=baseservice_serialized.data
                    if  item["customer"]==customerid:
                        item["customer"]=customerobj_serialized.data
                    if  item["studio"]==studioid:
                        item["studio"]=studioobj_serialized.data


                

                        

                
            print(appointmentsobjs_serialized.data)

            # print(studioobjs_serialized.data,"STUDIOS")
            return Response({"message":"success","appointmentdata":appointmentsobjs_serialized.data})
        except:
            return Response({"message":"not success"})
        


class Getstudios(APIView):
    def post(self,request):
 
        beautid=request.data.get("beautid")

        try:
            beautobj=Beautician.objects.get(id=beautid)
            studioobjs=Studio.objects.filter(beautician=beautobj)
            studioobjs_serialized=StudioSerializer(studioobjs,many=True)
            return Response({"message":"success","studios":studioobjs_serialized.data})
        except:
            return Response({"message":"not success"})
  
       

class Addstudio(APIView):
    def post(self,request):
        
        beautid=request.data.get("beautid")
        print(beautid,"FUNDA")
        locality=request.data.get("locality")
        place=request.data.get("place")
        district=request.data.get("district")
        state=request.data.get("state")
        country=request.data.get("country")
        pincode=request.data.get("pincode")


        try:
            beautobj=Beautician.objects.get(id=beautid)
            Studio.objects.create(beautician=beautobj,locality=locality,place=place,district=district,state=state,country=country,pincode=pincode)
            studioobjs=Studio.objects.filter(beautician=beautobj)
            studioobjs_serialized=StudioSerializer(studioobjs,many=True)
            return Response({"message":"success","studios":studioobjs_serialized.data})
        except:
            return Response({"message":"not success"})


class Editstudio(APIView):
    def post(self,request):
        
        beautid=request.data.get("beautid")
        studioid=request.data.get("studioid")

        locality=request.data.get("locality")
        place=request.data.get("place")
        district=request.data.get("district")
        state=request.data.get("state")
        country=request.data.get("country")
        pincode=request.data.get("pincode")


        try:
            beautobj=Beautician.objects.get(id=beautid)
            studioobj=Studio.objects.get(id=studioid)
            studioobj.locality=locality
            studioobj.place=place
            studioobj.district=district
            studioobj.state=state
            studioobj.country=country
            studioobj.pincode=pincode
            studioobj.save()
            
            studioobjs=Studio.objects.filter(beautician=beautobj)
            studioobjs_serialized=StudioSerializer(studioobjs,many=True)
            return Response({"message":"success","studios":studioobjs_serialized.data})
        except:
            return Response({"message":"not success"})
        
class Deletestudio(APIView):
    def post(self,request):
        
                
        studioid=request.data.get("studioid")
        print(studioid,"##################")
        studioobj=Studio.objects.get(id=studioid)
        print(studioobj,"STUDIONBJJJJDJDJJD")
        beautobj=studioobj.beautician
        studioobj.delete()
        studioobjs_serialized=StudioSerializer(Studio.objects.filter(beautician=beautobj),many=True)

        return Response({"message":"success","studios":studioobjs_serialized.data})
    
class Todaysschedule(APIView):
    def post(self,request):

        today_date = datetime.now().date()
        day_name = today_date.strftime('%A')
        
        print(request.data.get("beautid"),"NOKK")
        beautid=request.data.get("beautid")
        beautobj=Beautician.objects.get(id=beautid)
        appointments=Appointment.objects.filter(beautician=beautobj)
        if appointments.count()==0:
            return Response({"message":"failed", "date":str(today_date) , "day":str(day_name)})

        appointments_serialized=Appointmentserializer(appointments,many=True)

        

       

        return Response({"message":"success","schedules":appointments_serialized.data ,"date":str(today_date) , "day":str(day_name)})
    
class Forgotpassword(APIView):
    def post(self,request): 
        email=request.data.get("email")
        try:
            beautobj=Beautician.objects.get(email=email)
            id=beautobj.id
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
        print("reached")
        id=request.data.get("id")
        password=request.data.get("password")
        beautobj=Beautician.objects.get(id=id)
        beautobj.password=make_password(password)
        beautobj.save()
        print("Saved")
        return Response({"message":'success'})
 

        








