import "./App.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import beautslice from "../src/feautures/beautslice";
import loginslice from "./feautures/loginslice";
import adminloginslice from "./feautures/adminloginslice";
import adminnavigationslice from "./feautures/adminnavigationslice";


import Allroutes from "./Allroutes";
import adminDataAssignerSlice from "./feautures/adminDataAssignerSlice";

function App() {
  const store = configureStore({
    reducer: {
      signup: beautslice,
      login: loginslice,
      adminlogin:adminloginslice,
      adminnavigation:adminnavigationslice,
      adminalldatas:adminDataAssignerSlice
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
