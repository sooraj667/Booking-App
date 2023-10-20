import {createSlice} from "@reduxjs/toolkit"


const INITIALSTATE={
        allworkshops:[],
    
    
}

const workshopslice=createSlice(
    {
        name:"beautslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{

            setAllWorkshops:(state,action)=>{
                state.value.allworkshops=action.payload
            
                
              
              
            
                    
                
                
            },
            



         }
    }




)

export const {setAllWorkshops} = workshopslice.actions



export default workshopslice.reducer