import React from "react";
import Avatar from "@mui/material/Avatar";
import workshop_png from "../../../../images/Connected world-cuate.png";

import AddWorkshopModal from "./AddWorkshopModal";

const Workshops = () => {
  return (
    <div>
      <div className="hero">WORKSHOPS</div>
      <div className="flex justify-center">
        <Avatar src={workshop_png} sx={{ width: 220, height: 220 }} />
      </div>
      <div className="sub-heading-div flex justify-center align-center py-3 text-small fw-2 sgfont  themecolor underline">
        UPCOMING WORKSHOPS
        <AddWorkshopModal/>
        
      </div>
    </div>
  );
};

export default Workshops;
