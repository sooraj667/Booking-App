import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Input, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

const Landingpartbeaut = () => {
  const [addImage, setAddImage] = useState(false);
  const datas = useSelector((state) => state.login);

  const addImageHandler = () => {
    setAddImage((addImage) => !addImage);
    // console.log(datas.value.beautdetails.id); 
  };

  const uploadImageHandler=()=>{
    console.log("YEAH");

  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ width: 125, height: 125 }}
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQrATrKO9sHqDH9aNVbUHvnc_gh9lGS7rbVoVXELUADNeuGjAqE"
        />

        <Typography variant="h5" component="h2">
          {datas.value.beautdetails.email}
        </Typography>
      </Stack>

      <Button
        type="file"
        onClick={addImageHandler}
        variant="contained"
        startIcon={<InsertPhotoIcon />}
        sx={{ marginTop: "10px" }}
      >
        Change
      </Button>
      <div>
        {addImage && (
          <>
            <input
              className="selectimage"
              accept="image/*"
              id="upload-button"
              type="file"
            />
            <div>
            <Button
              type="file"
              onClick={uploadImageHandler}
              variant="contained"
              startIcon={<InsertPhotoIcon />}
              sx={{ marginTop: "10px" }}
            >
            
              Upload
            </Button>

            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Landingpartbeaut;
