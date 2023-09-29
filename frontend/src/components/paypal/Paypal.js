import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast,{Toaster} from 'react-hot-toast';
import axiosInstance from '../../axios/axiosconfig';
import { useSelector } from 'react-redux';
const Paypal = ( ) => {
    const reqdatas = useSelector((state) => state.custreqdata);
    const statedatas = useSelector((state) => state.login);
    const paymentdatas = useSelector((state) => state.paymentdatas);
  return (
    <>

    <PayPalScriptProvider options={{ clientId: "AeaCyw6WUYkOvfUXMp0ScN2r6KEfhVvxWytZvEAlbUXH_NoQsJ70TyTabFoedoIEkqTTwI5kUtFoaauE" }}>
            <PayPalButtons createOrder={
                (data,actions)=>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:"2.00"

                                }
                            }
                        ]
                    })
                }
            }
            onApprove={()=>{
                toast.success("Payment successfully completed!")
                const datas={
                    beautid: reqdatas.value.bookbeautdata.id,
                    custid: statedatas.value.custdetails.id,
                    date: paymentdatas.value.date,
                    time: paymentdatas.value.time,
                    service: paymentdatas.value.service,
                    studio: paymentdatas.value.studio,
                    
                }
                console.log(datas,"MWONEEEEEEEEEEEEE");
                axiosInstance.post("cust/booknow/",datas).then((response)=>{
                    console.log(response,"RESRERSRERSRERSR");
                }).catch((error)=>alert(error))
            }}
            onCancel={()=>{
                toast.error("You cancelled the payment!")
            }}
            onError={()=>{
                toast.error("Error!")
            }}
            
             />
             <Toaster/>
        </PayPalScriptProvider>
    
    </>
   
  )
}

export default Paypal