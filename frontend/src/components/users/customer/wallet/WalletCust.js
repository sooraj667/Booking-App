import React,{useState,useEffect} from 'react'
import axiosInstance from '../../../../axios/axiosconfig'


const WalletCust = () => {
    const [walletAmount,setWalletAmount]=useState("")
    useEffect(
        ()=>{
            const beautid=JSON.parse(localStorage.getItem("singledetails-C")).id
            const datas={
                id:beautid
            }
            axiosInstance.post("cust/get-wallet-amount/",datas).then((response)=>{
                setWalletAmount(response.data.amount)

            }).catch((error)=>{
                alert(error)
            })
        }
    )
  return (
    <div className="wallet-outer">
        <div className="hero">
            Wallet
        </div>
        <hr />
        <div className="schedule-outer">
        <div className="schedule-box">
          <div className="top">
            <div className="col-md-8 headingg">
              Available Amount

            </div>
            <div className="col-md-4 datee">
           

            </div>
            
          </div>
          <hr />
          <div className="wallet-content">
            Rs- {walletAmount} /-



          </div>
          

        </div>

        </div>
        
        
    </div>
  )
}

export default WalletCust