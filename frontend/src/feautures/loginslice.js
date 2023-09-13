import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    email:"",
    password:"",


    beautdetails:"",
    expertin:"",
    services:[],
    allservices:[],
    accesstokenB:null,

    custdetails:"",
    accesstokenC:null,
    allbeauticians:[]

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
            setExpertIn:(state,action)=>{
                state.value.expertin=action.payload
            },
            setServices:(state,action)=>{
                state.value.services=action.payload
            },
            setAllservices:(state,action)=>{
                state.value.allservices=action.payload
            },
            setCustDetails:(state,action)=>{
                state.value.custdetails=action.payload
            },
            setAccessTokenB:(state,action)=>{
                state.value.accesstokenB=action.payload

            },
            setAccessTokenC:(state,action)=>{
                state.value.accesstokenC=action.payload

            },
            setAllBeauticiansC:(state,action)=>{
                state.value.allbeauticians=action.payload

            }
          



         }
    }




)

export const {changeEmail,changePassword,setBeautDetails,setExpertIn,setServices,setCustDetails,setAccessTokenB,setAccessTokenC,setAllservices,setAllBeauticiansC} = loginslice.actions
export default loginslice.reducer