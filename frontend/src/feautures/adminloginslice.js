import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    email:"",
    password:"",


    details:"",
    accesstokenAd:null,

   

}

const adminloginslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            changeEmail:(state,action)=>{
                state.value.email=action.payload
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },
            setDetails:(state,action)=>{
                state.value.details=action.payload
            },
            setAccessTokenAd:(state,action)=>{
                state.value.accesstokenAd=action.payload

            },
       



         }
    }




)

export const {changeEmail,changePassword,setDetails,setAccessTokenAd} = adminloginslice.actions
export default adminloginslice.reducer