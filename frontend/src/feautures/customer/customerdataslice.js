import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    bookbeautdata:"",
    beautstudios:[],
    beautservices:[],
    allappointments:[],
   
   

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
            }
            
           
       



         }
    }




)

export const {setBookbeautdata,setBeautstudios,setBeautservices,setAllappointments} = customerdataslice.actions
export default customerdataslice.reducer