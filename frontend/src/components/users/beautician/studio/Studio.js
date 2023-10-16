import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import axiosInstance from "../../../../axios/axiosconfig";
import { useDispatch, useSelector } from "react-redux";
import { setStudiodatas } from "../../../../feautures/beautician/studioformslice";
import Addstudiomodal from "./Addstudiomodal";
import "./Studio.css";
import Editstudiomodal from "./Editstudiomodal";
import Deleteconfirmationmodal from "../../../modals/Deleteconfirmationmodal";
// import {setReRender} from "../../../../feautures/rerenderslice"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Studio = () => {
  const [changed, setChanged] = useState(false);
  const studiodatas = useSelector((state) => state.studioform);
  const rerender = useSelector((state) => state.rerender);
  const dispatch = useDispatch();

  useEffect(() => {
    const beautdetails = localStorage.getItem("singledetails-B");
    const parsed = JSON.parse(beautdetails);

    const datas = {
      beautid: parsed.id,
    };
    console.log(datas, "********8");
    axiosInstance
      .post("beaut/getstudios/", datas)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("studios-B", JSON.stringify(res.data.studios));
        dispatch(setStudiodatas(res.data.studios));
      })
      .catch((err) => alert(err));
  }, [changed]);

  const handleChildStateChange = () => {
    setChanged(true);
  };
  return (
    <div className="studio-outer">
      <div className="hero">Your Studios</div>
      <hr />
      <div className="add-studio">
      <Addstudiomodal />

      </div>

      <div className="outerbox">
        {studiodatas.value.studiodetails.map((item) => {
          return (
            <section className="aboutHome">
              <div className="container flexSB">
                <div className="right row">
                  <div className="items">
                    <>
                      <div className="item flexSB">
                        <div className="">
                         

                          <div></div>
                          <div className="text mt-3">
                            <h2>Mwone</h2>
                            <p>LOCALITY - {item.locality}</p>
                            <p>PLACE - {item.place}</p>
                            <hr />
                            <div className="row">
                              <Editstudiomodal studioId={item.id} />
                              <Deleteconfirmationmodal
                                id={item.id}
                                item_to_delete="studio"
                                rerenderit={handleChildStateChange}
                              />
                            </div>

                            <p></p>
                          </div>
                        </div>
                        <div className="text">
                         
                          
                          <p>DISTRICT - {item.district}</p>
                          <p>STATE - {item.state}</p>
                          <p>COUNTRY - {item.country}</p>
                          <p>PINCODE - {item.pincode}</p>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
    // <div>
    //   <div className="row">
    //     <div className="col-md-10">
    //       <h2>Your Studios</h2>
    //     </div>

    //     <div className="col-md-2 mt-2">
    //       
    //     </div>
    //   </div>
    //   <div className="row">
    //     <Stack spacing={2}>
    //       {studiodatas.value.studiodetails.map((item) => {
    //         return (
    //           <>
    //             <div class="address-container">
    //               <p class="address-text">
    //                 <span class="locality">{item.locality}</span>-
    //                 <span class="place">{item.place}</span>-
    //                 <span class="district">{item.district}</span>-
    //                 <span class="state">{item.state}</span>-
    //                 <span class="state">{item.country}</span>-
    //                 <span class="state"> Pincode:{item.pincode}</span>
    //               </p>
    //               <div className="row">
    // <Editstudiomodal studioId={item.id} />
    // <Deleteconfirmationmodal
    //   id={item.id}
    //   item_to_delete="studio"
    //   rerenderit={handleChildStateChange}

    // />
    //               </div>
    //             </div>
    //           </>
    //         );
    //       })}
    //     </Stack>
    //   </div>
    // </div>
  );
};

export default Studio;
