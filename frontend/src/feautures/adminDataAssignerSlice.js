import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    allbeautdatas:[],
    allcustdatas:[],


   
   

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
       



         }
    }




)

export const {setAllBeaut,setAllCust} = adminDataAssignerSlice.actions
export default adminDataAssignerSlice.reducer