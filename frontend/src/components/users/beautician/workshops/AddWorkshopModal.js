import React, { useState } from "react";
import { Transition } from "react-transition-group";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../axios/axiosconfig";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "react-datepicker";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddWorkshopModal = () => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");
  // const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [open, setOpen] = useState(false);

  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [slotNotAvailable, setSlotNotAvailable] = useState(false);

  const [alltime, setAlltime] = useState([
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ]);

  const handleStartTimeChange = (e) => {
    console.log(e.target.value, "TIME");
    setStartTime(e.target.value);
    const datas = {
      starttime: e.target.value,
      endtime: endTime,
    };
    axiosInstance
      .post("beaut/check-workshop-time/", datas)
      .then((res) => {
        if (res.data.message === "endtime-greater") {
          setTimeError("End Time Lesser");
        } else {
          setTimeError(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEndTimeChange = (e) => {
    console.log(e.target.value, "TIME");
    setEndTime(e.target.value);
    const datas = {
      starttime: startTime,
      endtime: e.target.value,
    };
    axiosInstance
      .post("beaut/check-workshop-time/", datas)
      .then((res) => {
        if (res.data.message === "endtime-greater") {
          setTimeError("End Time Lesser");
        } else {
          setTimeError(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("date", date);
    const currentdate = new Date();
    if (date < currentdate) {
      setDateError(true);
      setSlotNotAvailable(false);
    } else {
      setDateError(false);
    }
  };

  return (
    <React.Fragment>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        className="ml-2"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Toaster />

      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle> ADD NEW WORKSHOP</DialogTitle>
              <hr />

              <DialogContent>
                <div className="row">
                  <div className="col-md-6">
                    Workshop Subject
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    <br />
                  </div>

                  <div className="col-md-6">
                    Choose Date
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                      className=" inputform form-control"
                    />
                    {dateError && (
                      <Alert
                        severity="error"
                        sx={{
                          marginTop: "20px",
                          // marginLeft: "70px",
                        }}
                      >
                        Please Choose Valid Date
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    Choose Start Time
                    <select
                      name="selectedTime"
                      onChange={handleStartTimeChange}
                      className=" form-control inputform"
                    >
                      {alltime.map((item) => {
                        return <option>{item}</option>;
                      })}
                    </select>
                    {slotNotAvailable && (
                      <Alert
                        severity="error"
                        sx={{
                          marginTop: "20px",
                          marginLeft: "70px",
                        }}
                      >
                        Slot Already Booked! Choose Another Slot
                      </Alert>
                    )}
                  </div>

                  <div className="col-md-6">
                    Choose End Time
                    <select
                      name="selectedTime"
                      onChange={handleEndTimeChange}
                      className=" form-control inputform"
                    >
                      {alltime.map((item) => {
                        return <option>{item}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="row flex justify-center">
                  {timeError && (
                    <Alert
                      severity="error"
                      sx={{
                        marginTop: "20px",
                        marginLeft: "70px",
                      }}
                    >
                      Choose valid time
                    </Alert>
                  )}
                </div>

                <br />
                <Button>Confirm</Button>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
};

export default AddWorkshopModal;
