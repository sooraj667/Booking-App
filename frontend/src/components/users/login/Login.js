import React from "react";
import { Link } from "react-router-dom";
import Loginbeauticianpage from "../../../pages/users/login/Loginbeauticianpage";
import Logincustomerpage from "../../../pages/users/login/Logincustomerpage";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
const Login = () => {
  return (

    <Paper
      elevation={24}
      sx={{
        width: 600,
        height: 500,
        backgroundColor: "whitesmoke",
        marginLeft: "25%",
        opacity: [0.9, 0.8, 0.8],
        paddingBottom:"100px",
        // opacity: [0.2, 0.2, 0.2],
        // backgroundImage:"url('https://img.freepik.com/free-photo/handsome-man-barber-shop-styling-hair_1303-20978.jpg?w=900&t=st=1694015109~exp=1694015709~hmac=36ced935c8582a2ec223ac33da73dd0105c513f08b57fe8f947465966b7e7fce')",
        "&:hover": {
          backgroundColor: "whitesmoke",
          opacity: [0.2, 0.2, 0.5],
        },
      }}
    >
      <div className="content">Login as a Beautician or Customer</div>
      <div className="row">
        <div className="col-md-6">
          <Link to="../loginbeautician/">
            <Button
              variant="outlined"
              size="large"
              sx={{
                marginLeft: "120px",
                marginTop: "50px",
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                  opacity: [0.2, 0.2, 0.7],
                },
              }}
            >
              Beautician
            </Button>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="../logincustomer/">
            <Button
              variant="outlined"
              sx={{
                marginLeft: "20px",
                marginTop: "50px",
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                  opacity: [0.2, 0.2, 0.7],
                },
              }}
              size="large"
            >
              Customer
            </Button>
          </Link>
        </div>
      </div>
    </Paper>




    // <div className="signup">
    //   <div className="content">Login as a Beautician or Customer</div>
    //   <div className="row">
    //     <div className="col-md-6">
    //       <Link to="../loginbeautician/" element={<Loginbeauticianpage />}>
    //         <button className="btn btndesign">Beautician</button>
    //       </Link>
    //     </div>
    //     <div className="col-md-6">
    //       <Link to="../logincustomer/" element={<Logincustomerpage />}>
    //         <button className="btn btndesign">Customer</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
