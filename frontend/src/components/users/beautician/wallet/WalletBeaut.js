import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/axiosconfig";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import walletpic from "../../../../images/Wallet-rafiki.png"
const WalletBeaut = () => {
  const [walletAmount, setWalletAmount] = useState("");
  useEffect(() => {
    const beautid = JSON.parse(localStorage.getItem("singledetails-B")).id;
    const datas = {
      id: beautid,
    };
    axiosInstance
      .post("beaut/get-wallet-amount/", datas)
      .then((response) => {
        setWalletAmount(response.data.amount);
      })
      .catch((error) => {
        alert(error);
      });
  });
  return (
    <div className="wallet-outer">
      <div className="hero">Wallet</div>
      <hr />
      <div className=" flex justify-center">

      <Card
          size="lg"
          variant="plain"
          orientation="horizontal"
          sx={{
            textAlign: "center",
            maxWidth: "100%",
            width: 500,
            // to make the demo resizable
            resize: "horizontal",
            overflow: "auto",
          }}
        >
          <CardOverflow
            variant="solid"
            color="primary"
            sx={{
              flex: "0 0 200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: "var(--Card-padding)",
              backgroundColor:"#BA68C8",
            }}
          >
                <Typography textColor="primary.200">
              Hey, your wallet balance is
            </Typography>
            <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
              Rs. {walletAmount}/-
            </Typography>
        
          </CardOverflow>
          <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
            <AspectRatio ratio="19/8" objectFit="contain" variant="plain">
              <img
                alt=""
                src={walletpic}
              />
            </AspectRatio>
            <CardContent>
              {/* <Typography level="title-lg"> Wallet</Typography> */}
              <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                {/* You can use this amount to make bookings! */}
              </Typography>
            </CardContent>
            {/* <Button
              variant="outlined"
              color="primary"
              sx={{
                "--variant-borderWidth": "2px",
                borderRadius: 40,
                borderColor: "primary.500",
                mx: "auto",
              }}
            >
              Book Now
            </Button> */}
          </CardContent>
        </Card>





        {/* <div className="schedule-box">
          <div className="top">
            <div className="col-md-8 headingg">Available Amount</div>
            <div className="col-md-4 datee"></div>
          </div>
          <hr />
          <div className="wallet-content">Rs- {walletAmount} /-</div>
        </div> */}
      </div>
    </div>
  );
};

export default WalletBeaut;
