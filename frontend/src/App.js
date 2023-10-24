import "./App.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import beautslice from "../src/feautures/beautslice";
import loginslice from "./feautures/loginslice";
import adminloginslice from "./feautures/adminloginslice";
import adminnavigationslice from "./feautures/adminnavigationslice";
import beautnavigationslice from "./feautures/beautician/beautnavigationslice";

import Allroutes from "./Allroutes";
import adminDataAssignerSlice from "./feautures/adminDataAssignerSlice";
import customernavigationslice from "./feautures/customer/customernavigationslice";
import customerdataslice from "./feautures/customer/customerdataslice";
import studioformslice from "./feautures/beautician/studioformslice";
import rerenderslice from "./feautures/rerenderslice";
import otpslice from "./feautures/otpslice";
import paymentdataslice from "./feautures/customer/paymentdataslice";
import servicepreviewslice from "./feautures/customer/servicepreviewslice";
import forgotpasswordslice from "./feautures/forgotpassword/forgotpasswordslice";
import variableSlice from "./feautures/variableSlice";
import workshopslice from "./feautures/beautician/workshopslice";
function App() {
  const store = configureStore({
    reducer: {
      signup: beautslice,
      login: loginslice,
      adminlogin:adminloginslice,
      adminnavigation:adminnavigationslice,
      adminalldatas:adminDataAssignerSlice,
      beautnavigation:beautnavigationslice,
      custnavigation:customernavigationslice,
      custreqdata:customerdataslice,
      studioform:studioformslice,
      rerender:rerenderslice,
      otp:otpslice,
      paymentdatas:paymentdataslice,
      servicepreview:servicepreviewslice,
      forgotpassword:forgotpasswordslice,
      variables:variableSlice,
      workshops:workshopslice
    },
  });

  // const accesstoken = useSelector((state) => state.login.value.accesstoken);
  // {
  //   console.log(accesstoken);
  // }

  return (
    <Provider store={store}>

      <Allroutes/>

      
      
    </Provider>
  );
}

export default App;
