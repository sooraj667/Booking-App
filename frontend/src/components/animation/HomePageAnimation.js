import React from 'react'
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';
import FormControlLabel from '@mui/material/FormControlLabel';
import b from "../../images/hairdresser team-pana.png"
import c from "../../images/Barber-bro.png"
const icon1 = (
    <Paper sx={{ m: 1, width: 250, height: 250,background:"inherit" }} elevation={4}>
    <svg width="100%" height="100%">
      {/* Define the pattern with the image */}
      <defs>
        <pattern
          id="image-pattern1"
          x="0"
          y="0"
          patternUnits="objectBoundingBox"
          width="100%"
          height="100%"
        >
          <image href={b} width="100%" height="100%" />
        </pattern>
      </defs>

      {/* Use the pattern as fill for the polygon */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#image-pattern1)" />
    </svg>
  </Paper>
);




const icon2 = (
    <Paper sx={{ m: 1, width: 250, height: 250,background:"inherit" }} elevation={4}>
    <svg width="100%" height="100%">
      {/* Define the pattern with the image */}
      <defs>
        <pattern
          id="image-pattern2"
          x="0"
          y="0"
          patternUnits="objectBoundingBox"
          width="100%"
          height="100%"
        >
          <image href={c} width="100%" height="100%" />
        </pattern>
      </defs>

      {/* Use the pattern as fill for the polygon */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#image-pattern2)" />
    </svg>
  </Paper>
);



const HomePageAnimation = () => {
    const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Box sx={{ height: 180 }}>
      {/* <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      /> */}
      <Box sx={{ display: 'flex', }}>
        <Zoom in={checked}>{icon1}</Zoom>
    
        <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
          {icon2}
        </Zoom>
      </Box>
      <div className="flex justify-around">
       
        <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
        SIGNUP AS BEAUTICIAN
        
      </div>

   
        
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor ">
        SIGNUP AS CUSTOMER
        
      </div>
      </div>
      
    </Box>
  )
}

export default HomePageAnimation