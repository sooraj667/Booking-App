import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    allbeautdatas:[],
    allcustdatas:[],
    allservices:[],
    allappointments:[],



   
   

}

const adminDataAssignerSlice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setAllBeaut:(state,action)=>{
                state.value.allbeautdatas=action.payload
            },
            setAllCust:(state,action)=>{
                state.value.allcustdatas=action.payload
            },
            setAllservices:(state,action)=>{
                state.value.allservices=action.payload
            },
            setAllAppointments:(state,action)=>{
                state.value.allappointments=action.payload
            },
       



         }
    }




)

export const {setAllBeaut,setAllCust,setAllservices,setAllAppointments} = adminDataAssignerSlice.actions
export default adminDataAssignerSlice.reducer