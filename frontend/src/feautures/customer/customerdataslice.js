import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={
    bookbeautdata:"",
    beautstudios:[],
    beautservices:[],
   
   

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
            
           
       



         }
    }




)

export const {setBookbeautdata,setBeautstudios,setBeautservices} = customerdataslice.actions
export default customerdataslice.reducer