import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast,{Toaster} from 'react-hot-toast';

const Paypal = () => {
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