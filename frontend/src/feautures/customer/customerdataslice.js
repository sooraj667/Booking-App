import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    bookbeautdata:"",
    beautstudios:[],
    beautservices:[],
    allappointments:[],

    date:"",
    time:"",
    studio:"",
    service:"",
   
   

}

const customerdataslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setBookbeautdata:(state,action)=>{
                state.value.bookbeautdata=action.payload
            },
            setBeautstudios:(state,action)=>{
                state.value.beautstudios=action.payload
            },
            setBeautservices:(state,action)=>{
                state.value.beautservices=action.payload
            },
            setAllappointments:(state,action)=>{
                state.value.allappointments=action.payload
            },




            setDate:(state,action)=>{
                state.value.date=action.payload
            },
            setTime:(state,action)=>{
                state.value.time=action.payload
            },
            setStudio:(state,action)=>{
                state.value.studio=action.payload
            },
            setService:(state,action)=>{
                state.value.service=action.payload
            }
            
           
       



         }
    }




)

export const {setBookbeautdata,setBeautstudios,setBeautservices,setAllappointments,     setService,setStudio,setTime,setDate} = customerdataslice.actions
export default customerdataslice.reducer