import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE={

    rerender:false,
   
}

const rerenderslice=createSlice(
    {
        name:"loginslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            setReRender:(state)=>{
                state.value.rerender=true
            },
            
          



         }
    }




)

export const {setReRender} = rerenderslice.actions
export default rerenderslice.reducer