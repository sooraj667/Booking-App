import {createSlice} from "@reduxjs/toolkit"


const INITIALSTATE={
    
        locality:"",
        place:"",
        district:"",
        state:"",
        error:{
            locality:null,
            place:null,
            district:null,
            state:null,
            
        },
        errorcheck:false,

        studiodetails:[]
    
}

const studioformslice=createSlice(
    {
        name:"beautslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            changeLocality:(state,action)=>{
            
                
              
              
            
                    
                if (!/^[a-zA-Z]+$/.test(action.payload)){
                    state.value.error.locality="Locality can only have alphabets!"
                    state.value.errorcheck=true
                }
                // else if (action.payload!=="*"){
                //     state.value.error.pname=null
                //     state.value.errorcheck=false
            
                // }
             
                else{
                    state.value.error.locality=null
                    state.value.locality=action.payload
                    state.value.errorcheck=false
                }
                
            },changePlace:(state,action)=>{
                if (!/^[a-zA-Z]+$/.test(action.payload)){
                    state.value.error.place="Place can only have alphabets!"
                    state.value.errorcheck=true
                }
    
             
                else{
                    state.value.error.place=null
                    state.value.place=action.payload
                    state.value.errorcheck=false
                }
                
            },
            changeDistrict:(state,action)=>{
                // if(action.payload==="3"){
                //     state.value.error.phone="Invalid Phonenumber"

                // }
 
                if (!/^[a-zA-Z]+$/.test(action.payload)){
                    state.value.error.district="District can only have alphabets!"
                    state.value.errorcheck=true
                }
       
             
                else{
                    state.value.error.district=null
                    state.value.district=action.payload
                    state.value.errorcheck=false
                }


                
            },
            changeState:(state,action)=>{
                if (!/^[a-zA-Z]+$/.test(action.payload)){
                    state.value.error.state="District can only have alphabets!"
                    state.value.errorcheck=true
                }
       
             
                else{
                    state.value.error.state=null
                    state.value.state=action.payload
                    state.value.errorcheck=false
                }
                
            },
            setStudiodatas:(state,action)=>{
                state.value.studiodetails=action.payload
            }



         }
    }




)

export const {changeState,changeDistrict,changePlace,changeLocality,setStudiodatas} = studioformslice.actions



export default studioformslice.reducer