import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setAllservices, setServices } from "../../../../feautures/loginslice";
import axiosInstance from "../../../../axios/axiosconfig";
import { setBeautDetails } from "../../../../feautures/loginslice";
import {
  changePlace,
  changeLocality,
  changeDistrict,
  changeState,
  changeCountry,
  changePincode,
  setStudiodatas,
} from "../../../../feautures/beautician/studioformslice";
import Input from "@mui/joy/Input";
import MuiAlert from "@mui/material/Alert";
import toast from "react-hot-toast";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Editstudiomodal = (props) => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const formdatas = useSelector((state) => state.studioform);
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [singleStudioDetails, setSingleStudioDetails] = useState("");

  const [name, setName] = useState(singleStudioDetails.studio_name);
  const [locality, setLocality] = useState(singleStudioDetails.locality);
  const [place, setPlace] = useState(singleStudioDetails.place);
  const [district, setDistrict] = useState(singleStudioDetails.district);
  const [state, setState] = useState(singleStudioDetails.state);
  const [country, setCountry] = useState(singleStudioDetails.country);
  const [pincode, setPincode] = useState(singleStudioDetails.pincode);

  const [nameError, setNameError] = useState(false);
  const [localityError, setLocalityError] = useState(false);
  const [placeError, setPlaceError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);

  const [cannotUpdate, setCannotUpdate] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(props.studioId, "STUDIOID");

    const studios = localStorage.getItem("studios-B");
    const parsed = JSON.parse(studios);
    dispatch(setStudiodatas(parsed));
  }, [changed]);

  const handleUpdate = () => {

    if (
      (name === "" ||
      locality === "" ||
      place === "" ||
      district === "" ||
      state === "" ||
      country === "" ||
      pincode === "")
      ||(!nameError===false || !localityError===false || !placeError===false || !districtError===false || !stateError===false || !countryError===false || !pincodeError===false)
    ) {
      setCannotUpdate(true);
      return;
    }
    const beautdetails = localStorage.getItem("singledetails-B");
    const beautparsed = JSON.parse(beautdetails);

    const datas = {
      studioid: props.studioId,
      beautid: beautparsed.id,
      name: name,
      locality: locality,
      place: place,
      district: district,
      state: state,
      country: country,
      pincode: pincode,
    };
    console.log(datas,"DATAS IVDE KEDAPPOND");

    axiosInstance
      .post("beaut/editstudio/", datas)
      .then((res) => {
        //localStorage.setItem("studios-B", JSON.stringify(res.data.studios));
        console.log(res.data.studios, "ITHAAN STUDIOS");
        props.set(res.data.studios)
        setChanged((prev) => !prev);
        toast.success("Updated")
        handleClose();
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    // const studioid=localStorage.getItem("studio-id")

    const datas = {
      id: props.studioId,
    };
    axiosInstance
      .post("beaut/get-single-studio/", datas)
      .then((res) => {
        setName(res.data.studiodetails.studio_name);
        setLocality(res.data.studiodetails.locality);
        setPlace(res.data.studiodetails.place);
        setDistrict(res.data.studiodetails.district);
        setState(res.data.studiodetails.state);
        setCountry(res.data.studiodetails.country);
        setPincode(res.data.studiodetails.pincode);
      })
      .catch((error) => {
        alert(error);
      });
  }, [changed]);
  return (
    <div>
      {console.log(name, state, place, country)}
      <div>
        <Button
          onClick={() => {
            handleOpen();
          }}
          variant="contained"
          sx={{
            marginTop: "10px",
            backgroundColor: "inherit",
            color: "black",
            marginLeft: 2,
            "&:hover": {
              backgroundColor: "#212529",
              color: "#D0D4D9",
            },
          }}
        >
          Edit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                marginLeft: "90px",
                marginBottom: "30px",
              }}
            >
              Edit Details
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div class="card-body">
                <div class="form-group">
                  <div className="row">
                    <label for="username" className="mr-3">
                      Studio Name:
                    </label>
                    <TextField
                      value={name}
                      variant="standard"
                      
                      onChange={(e) => {
                        setCannotUpdate(false);

                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setNameError("Studio name can only have alphabets!");
                          setName(e.target.value);
                        } else {
                          setNameError(false);
                          setName(e.target.value);

                          
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{nameError}</span>
                </div>
                <div class="form-group">
                  <div className="row">
                    <label for="username" className="mr-3">
                      Locality:
                    </label>
                    <TextField
                      value={locality}
                      variant="standard"
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setLocalityError(
                            "Locality name can only have alphabets!"
                          );
                          setLocality(e.target.value);
                        } else {
                          setLocalityError(false);
                          setLocality(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{localityError}</span>
                </div>

                <div class="form-group">
                  <div className="row">
                    <label for="email" className="mr-3">
                      Place:
                    </label>
                    <TextField
                      value={place}
                      variant="standard"
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setPlaceError("Place name can only have alphabets!");
                          setPlace(e.target.value);
                        } else {
                          setPlaceError(false);
                          setPlace(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{placeError}</span>
                </div>

                <div class="form-group">
                  <div className="row">
                    <label for="password" className="mr-3">
                      District:
                    </label>
                    <TextField
                      value={district}
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setDistrictError(
                            "District name can only have alphabets!"
                          );
                          setDistrict(e.target.value);
                        } else {
                          setDistrictError(false);
                          setDistrict(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{districtError}</span>
                </div>

                <div class="form-group">
                  <div className="row">
                    <label for="password" className="mr-3">
                      State:
                    </label>
                    <TextField
                      value={state}
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setStateError("State name can only have alphabets!");
                          setState(e.target.value);
                        } else {
                          setStateError(false);
                          setState(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{stateError}</span>
                </div>

                <div class="form-group">
                  <div className="row">
                    <label for="password" className="mr-3">
                      Country:
                    </label>
                    <TextField
                      value={country}
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setCountryError(
                            "Country name can only have alphabets!"
                          );
                          setCountry(e.target.value);
                        } else {
                          setCountryError(false);
                          setCountry(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{countryError}</span>
                </div>

                <div class="form-group">
                  <div className="row">
                    <label for="password" className="mr-3">
                      Pincode:
                    </label>
                    <TextField
                      value={pincode}
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^\d{6}$/.test(e.target.value)) {
                          setPincodeError("Invalid Pincode!");
                          setPincode(e.target.value);
                        } else {
                          setPincodeError(false);
                          setPincode(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <span className="text-danger">{pincodeError}</span>
                </div>
                <div className="flex justify-around">
                  {/* {nameError === false ||
                  localityError === false ||
                  placeError === false ||
                  districtError === false ||
                  stateError === false ||
                  countryError === false ||
                  pincodeError === false ? ( */}
                    <Button variant="contained" onClick={handleUpdate}>
                      Update
                    </Button>
                  {/* ) : (
                    <Button
                      variant="contained"
                      onClick={() => setCannotUpdate(false)}
                    >
                      Update
                    </Button>
                  )} */}
                  <Button variant="contained" onClick={handleClose}>
                    Close
                  </Button>
                </div>
                <div className="flex justify-center">
                  {cannotUpdate && (
                    <div className="cannot-update">
                      <Alert
                        severity="error"
                        sx={{
                          marginTop: "20px",
                          marginLeft: "70px",
                        }}
                      >
                        Please Fill All The Fields
                      </Alert>
                    </div>
                  )}
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Editstudiomodal;
