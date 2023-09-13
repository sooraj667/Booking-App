import React, { useEffect } from "react";
import Contents from "./Contents";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setBookbeautdata } from "../../../feautures/customer/customerdataslice";
const Booknow = () => {
  const details = useSelector((state) => state.login);
  const navdatas = useSelector((state) => state.custnavigation);
  const reqdatas = useSelector((state) => state.custreqdata);
  const dispatch = useDispatch();

  useEffect(() => {
    const allBeauticians = localStorage.getItem("allbeauticians-C");
    console.log(navdatas.value.booknowbeauticianid, "BEAUTID");

    if (allBeauticians) {
      const allbeaut_parsed = JSON.parse(allBeauticians);
      allbeaut_parsed.filter((item) => {
        if (navdatas.value.booknowbeauticianid == item.id) {
          const reqbeaut = item;
          console.log(reqbeaut, "REQBEAUT####");
          dispatch(setBookbeautdata(reqbeaut));

          return reqbeaut;
        }
      });
    }
  }, []);

  return (
    <div>
      <Stack spacing={2} sx={{
        marginTop:"70px",
        marginLeft:"220px"
      }}>
       
          <Avatar
            src={reqdatas.value.bookbeautdata.image}
            sx={{
              width: 225,
              height: 225,
        
            }}
          />
       
      </Stack>
    </div>
  );
};

export default Booknow;
