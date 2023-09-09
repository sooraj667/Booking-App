import {createSlice} from "@reduxjs/toolkit"


const INITIALSTATE={
    
        pname:"",
        email:"",
        phone:"",
        password:"",
        cpassword:"",
        error:{
            pname:null,
            email:null,
            phone:null,
            cpassword:null,
            
        },
        errorcheck:false,
    
}

const beautslice=createSlice(
    {
        name:"beautslice",
        initialState:{
            value:INITIALSTATE
         },
         reducers:{
            changePName:(state,action)=>{
            
                
              
              
            
                    
                if (!/^[a-zA-Z]+$/.test(action.payload)){
                    state.value.error.pname="Name can only have alphabets!"
                    state.value.errorcheck=true
                }
                else if (action.payload!=="*"){
                    state.value.error.pname=null
                    state.value.errorcheck=false
            
                }
             
                else{
                    state.value.pname=action.payload
                    state.value.errorcheck=false
                }
                
            },changeEmail:(state,action)=>{
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(action.payload)){
                    state.value.error.email="Invalid Email!"
                    state.value.errorcheck=true

                }
                else{
                    state.value.email=action.payload
                    state.value.error.email=null
                    state.value.errorcheck=false

                }
                
            },
            changePhone:(state,action)=>{
                // if(action.payload==="3"){
                //     state.value.error.phone="Invalid Phonenumber"

                // }
 
                if(!/^\d{10}$/.test(action.payload)){
                    state.value.error.phone="Invalid Phonenumber"
                    state.value.errorcheck=true
                    
                }
                else{
                    state.value.phone=action.payload
                    state.value.error.phone=null
                    state.value.errorcheck=false
                }


                
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },
            changeCpassword:(state,action)=>{
                if(action.payload!==state.value.password){
                    state.value.error.cpassword="Password doesnt match!"
                    state.value.errorcheck=true
                }
                else{
                    state.value.cpassword=action.payload
                    state.value.error.cpassword=null
                    state.value.errorcheck=false

                }
                
            },



         }
    }




)

export const {changePName,changeEmail,changePassword,changeCpassword,changePhone} = beautslice.actions



export default beautslice.reducer

