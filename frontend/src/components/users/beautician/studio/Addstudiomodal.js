import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setAllservices, setServices } from "../../../../feautures/loginslice";
import axiosInstance from "../../../../axios/axiosconfig";
import { setBeautDetails } from "../../../../feautures/loginslice";
import toast, { Toaster } from "react-hot-toast";
import {
  changeName,
  changePlace,
  changeLocality,
  changeDistrict,
  changeState,
  changePincode,
  changeCountry,
  setStudiodatas,
} from "../../../../feautures/beautician/studioformslice";
import Input from "@mui/joy/Input";
import MuiAlert from "@mui/material/Alert";

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

const Addstudiomodal = (props) => {
  const dispatch = useDispatch();
  const statedatas = useSelector((state) => state.login);
  const formdatas = useSelector((state) => state.studioform);
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);

  const [name, setName] = useState("");
  const [locality, setLocality] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");

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
    const studios = localStorage.getItem("studios-B");
    const parsed = JSON.parse(studios);
    dispatch(setStudiodatas(parsed));
  }, [changed]);

  const handleUpdate = () => {
    if (
      name === "" ||
      locality === "" ||
      place === "" ||
      district === "" ||
      state === "" ||
      country === "" ||
      pincode === ""
    ) {
      setCannotUpdate(true);
      return;
    }

    const beautdetails = localStorage.getItem("singledetails-B");
    const beautparsed = JSON.parse(beautdetails);
    console.log(beautparsed, "*****************88");

    const datas = {
      beautid: beautparsed.id,
      name: name,
      locality: locality,
      place: place,
      district: district,
      state: state,
      country: country,
      pincode: pincode,
    };
    // const req_values = Object.values(datas);
    // req_values.map((item) => {
    //   if (item === "") {
    //     setCannotUpdate(true);
    //     return;
    //   } else {
    //     setCannotUpdate(false);
    //   }
    // });
    console.log(formdatas.value.pname, "##############333");
    axiosInstance
      .post("beaut/addstudio/", datas)
      .then((res) => {
        //localStorage.setItem("studios-B", JSON.stringify(res.data.studios));
        props.set(res.data.studios)
        console.log(res.data.studios, "ITHAAN STUDIOS");

        setChanged((prev) => !prev);
        handleClose();
        toast.success("New Studio Address Added!")
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setName("");
            setLocality("");
            setPlace("");
            setDistrict("");
            setState("");
            setCountry("");
            setPincode("");

            setNameError(false)
            setLocalityError(false)
            setPlaceError(false)
            setDistrictError(false)
            setStateError(false)
            setCountryError(false)
            setPincodeError(false)

            setCannotUpdate(false)

            handleOpen()
          }}
          variant="contained"
          sx={{
            marginTop: "10px",
            backgroundColor: "inherit",
            color: "black",
            "&:hover": {
              backgroundColor: "#212529",
              color: "#D0D4D9",
            },
          }}
        >
          Add Studio
        </Button>
        <Toaster/>
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
                      variant="standard"
                      onChange={(e) => {
                        setCannotUpdate(false);

                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setNameError("Studio name can only have alphabets!");
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
                      variant="standard"
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setLocalityError(
                            "Locality name can only have alphabets!"
                          );
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
                      variant="standard"
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setPlaceError("Place name can only have alphabets!");
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
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setDistrictError(
                            "District name can only have alphabets!"
                          );
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
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setStateError("State name can only have alphabets!");
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
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
                          setCountryError(
                            "Country name can only have alphabets!"
                          );
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
                      type="numtextber"
                      variant="standard"
                      required
                      onChange={(e) => {
                        setCannotUpdate(false);
                        if (!/^\d{6}$/.test(e.target.value)) {
                          setPincodeError("Invalid Pincode!");
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


                    
                {(nameError === false ||
      localityError === false ||
      placeError === false ||
      districtError === false ||
      stateError ===false ||
      countryError === false ||
      pincodeError === false) ? (
                  <Button variant="contained" onClick={handleUpdate}>
                    Update
                  </Button>
                ) :  <Button variant="contained"  onClick={()=>setCannotUpdate(false)}>
                Update
              </Button>}
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

export default Addstudiomodal;
