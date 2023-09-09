import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    email:"",
    password:"",


    beautdetails:"",
    accesstoken:null,

    custdetails:"",
    accesstokenC:null

}

const loginslice=createSlice(
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
            setBeautDetails:(state,action)=>{
                state.value.beautdetails=action.payload
            },
            setCustDetails:(state,action)=>{
                state.value.custdetails=action.payload
            },
            setAccessToken:(state,action)=>{
                state.value.accesstoken=action.payload

            },
            setAccessTokenC:(state,action)=>{
                state.value.accesstokenC=action.payload

            }



         }
    }




)

export const {changeEmail,changePassword,setBeautDetails,setCustDetails,setAccessToken,setAccessTokenC} = loginslice.actions
export default loginslice.reducer