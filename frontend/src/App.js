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
