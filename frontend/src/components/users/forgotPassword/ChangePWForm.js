import React,{useState} from "react";
import { Button } from "@mui/material";
import axiosInstance from "../../../axios/axiosconfig";

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ChangePWForm = () => {

    const[password,setPassword]=useState("")
    const[rePassword,setRePassword]=useState("")
    const[error,setError]=useState("")

    const forgotpassword=useSelector((state)=>state.forgotpassword)

    const navigate=useNavigate()
    
    const passwordChangeHandler=(e)=>{
        setPassword(e.target.value)
    }
    const rePasswordChangeHandler=(e)=>{
        setRePassword(e.target.value)
    }

    const handleSubmit=()=>{
        console.log("CLICKED");
        if (password===""){
            setError("Password is Empty")
            console.log("CLICKED EMOTY");

        }
        else if(rePassword!==password){
            setError("Password doesn't match!")
            console.log("CLICKED dont match");

        }
        else if (password===rePassword){
            console.log("CLICKED BEST");
            

            if (localStorage.getItem("change-pw-status")==="beautician"){
              const datas={
                password:password,
                id:localStorage.getItem("forgotpassword-id-beautician")
            }
            console.log(datas,"THESE ARE DATAS");
            axiosInstance.post("beaut/changepassword/",datas).then((res)=>{
                
                console.log(res.data,"AFTER VIEW");
                toast.success('Password Changed! Redirecting to Loginpage')
                setTimeout(()=>{
                    
                    navigate("../login")

                },3000)

                

                

                setError(false)
            }).catch((error)=>{
                alert("Error")

            })

            }





            if(localStorage.getItem("change-pw-status")==="customer"){
              const datas={
                password:password,
                id:localStorage.getItem("forgotpassword-id")
            }
            console.log(datas);
            axiosInstance.post("cust/changepassword/",datas).then((res)=>{
                
                console.log(res.data);
                toast.success('Password Changed! Redirecting to Loginpage')
                setTimeout(()=>{
                    
                    navigate("../login")

                },3000)

                

                

                setError(false)
            }).catch((error)=>{
                alert("Error")

            })

            }




            
        }
    }
  return (
    
    <div className="form-main-div">
      {console.log(forgotpassword.value,"HEEYYYYYY")}
        <Toaster />
      <h2 className="head">Change Password</h2>
      <hr />
      <div className="row mt-5">
        <div className="col-3 title">New Password</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control bg-transparent inp"
            placeholder="Type Password"
            onChange={passwordChangeHandler}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-3 title">Retype Password</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control bg-transparent inp"
            placeholder="Retype your new Password"
            onChange={rePasswordChangeHandler}
          />
        </div>
      </div>
      <div className="row btndiv">
        <div className="">
            <Button className="text-success" onClick={handleSubmit}>Submit</Button>

        </div>
        {/* <div className="col-md-6 btndiv">
        <Button className="text-danger">Close</Button>

        </div> */}
      </div>
      {
                  error && <Alert severity="error" sx={{
                    marginTop:'20px'
                  }}>{error}</Alert>
                }
    </div>
  );
};

export default ChangePWForm;
