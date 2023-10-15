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
            submiterror:null,

            
            
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
            
                
              
              
            
                    
                if (!/^[a-zA-Z ]+$/.test(action.payload)){
                    state.value.error.pname="Name can only have alphabets!"
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                }
              
             
                else{
                    state.value.error.pname=null
                    state.value.pname=action.payload
                    state.value.errorcheck=false
                }
                
            },changeEmail:(state,action)=>{
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(action.payload)){
                    state.value.error.email="Invalid Email!"
                    state.value.error.submiterror=null
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
 
                if(!/^(?!([0-9])\1{9})[0-9]{10}$/.test(action.payload)){
                    state.value.error.phone="Invalid Phonenumber"
                    state.value.error.submiterror=null
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
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                }
                else{
                    state.value.cpassword=action.payload
                    state.value.error.cpassword=null
                    state.value.errorcheck=false

                }
                
            },
            submitForm:(state,action)=>{
                if (state.value.pname==="" || state.value.email==="" || state.value.phone===""|| state.value.password==="" || state.value.cpassword===""){
                    state.value.error.submiterror="Please Fill All Fields!"
                    
                }
                else{
                    state.value.error.submiterror=null
                    

                }
                
                
            },



         }
    }




)

export const {changePName,changeEmail,changePassword,changeCpassword,changePhone,submitForm} = beautslice.actions



export default beautslice.reducer

