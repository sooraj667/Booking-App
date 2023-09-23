import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    otp:"",
    beautotpstatus:false,
    custotpstatus:false,
  

}

const otpslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            changeOtp:(state,action)=>{
                state.value.otp=action.payload
            },
            setBeautotp:(state,action)=>{
                state.value.beautotpstatus=true
                state.value.custotpstatus=false
            },
            setCustotp:(state,action)=>{
                state.value.custotpstatus=true
                state.value.beautotpstatus=false
                
            },
            



         }
    }




)

export const {setCustotp,setBeautotp,changeOtp} = otpslice.actions
export default otpslice.reducer