import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import axiosInstance from "../../../../axios/axiosconfig";
import Avatar from "@mui/joy/Avatar";
import { toggleBooknow } from "../../../../feautures/customer/customernavigationslice";
import { useDispatch } from "react-redux";
import AddToFavouritesModal from "../bookings/AddToFavouritesModal";

const TopBeauticians = () => {
  const [ranking, setRanking] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("cust/gettopbeauticians/")
      .then((response) => {
        setRanking(response.data.topbeauticians);
        console.log(response.data.topbeauticians, "DTAS");
      })
      .catch((error) => {
        alert("ERROR");
      });
  }, []);


  const booknowHandler = (id) => {
    dispatch(toggleBooknow(id));
    localStorage.setItem("id", id);
 
  };

  return (
    <>
      {ranking && (
        <div className="flex justify-around mt-4 mb-4 max-w">
          <div>
            <Card
              data-resizable
              sx={{
                textAlign: "center",
                alignItems: "center",
                width: 323,
                
             
                // to make the demo resizable
                overflow: "auto",
                resize: "horizontal",
                "--icon-size": "100px",
              }}
            >
              <CardOverflow variant="solid" color="warning">
                <AspectRatio
                  variant="outlined"
                  color="warning"
                  ratio="1"
                  sx={{
                    m: "auto",
                    transform: "translateY(50%)",
                    borderRadius: "50%",
                    width: "var(--icon-size)",
                    boxShadow: "sm",
                    bgcolor: "background.surface",
                    position: "relative",
                  }}
                >
                  <div>
                    <Avatar
                      src={ranking.second.image}
                      sx={{ width: 150, height: 150 }}
                    />
                    {/* <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} /> */}
                  </div>
                </AspectRatio>
              </CardOverflow>
              <Typography
                level="title-lg"
                sx={{ mt: "calc(var(--icon-size) / 2)" }}
              >
                🎊 {ranking.second.name} 🎊
              </Typography>
              <CardContent sx={{ maxWidth: "40ch" }}>
              Meet Our Second Top Beautician: Master of Elegance!
                <br />
                <br />
                Total Bookings{" "}
                <span className="text-info text-medium">
                  {ranking.second.appointment_count}
                </span>{" "}
            
              </CardContent>
              <CardActions
                orientation="vertical"
                buttonFlex={1}
                sx={{
                  "--Button-radius": "40px",
                  width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
                }}
              >
                <Button variant="solid" color="warning" onClick={() => booknowHandler(ranking.second.id)}>
                  Book Now
                </Button>
                <AddToFavouritesModal myid={ranking.second.id}/>
              </CardActions>
            </Card>
          </div>

          <div>
            <Card
              data-resizable
              sx={{
                textAlign: "center",
                alignItems: "center",
                width: 323,
                // to make the demo resizable
                overflow: "auto",
                resize: "horizontal",
                "--icon-size": "100px",
              }}
            >
              <CardOverflow variant="solid" color="primary">
                <AspectRatio
                  variant="outlined"
                  color="warning"
                  ratio="1"
                  sx={{
                    m: "auto",
                    transform: "translateY(50%)",
                    borderRadius: "50%",
                    width: "var(--icon-size)",
                    boxShadow: "sm",
                    bgcolor: "background.",
                    position: "relative",
                  }}
                >
                  <div>
                    <Avatar
                      src={ranking.first.image}
                      sx={{ width: 150, height: 150 }}
                    />
                    {/* <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} /> */}
                  </div>
                </AspectRatio>
              </CardOverflow>
              <Typography
                level="title-lg"
                sx={{ mt: "calc(var(--icon-size) / 2)" }}
              >
                🎊 {ranking.first.name} 🎊
              </Typography>
              <CardContent sx={{ maxWidth: "40ch" }}>
                Meet the most sought-after beautician in town!
                <br />
                <br />
                Total Bookings{" "}
                <span className="text-info text-medium">
                  {ranking.first.appointment_count}
                </span>{" "}
               
              </CardContent>
              <CardActions
                orientation="vertical"
                buttonFlex={1}
                sx={{
                  "--Button-radius": "40px",
                  width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
                }}
              >
                <Button variant="solid" color="primary" onClick={() => booknowHandler(ranking.first.id)}>
                Book Now
                </Button>
           
                <AddToFavouritesModal myid={ranking.first.id}/>
                
              </CardActions>
            </Card>
          </div>

          <div className="">
          <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 323,
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="warning">
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
            <Avatar src={ranking.third.image} sx={{width:150,height:150}}/>
            {/* <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} /> */}
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 {ranking.third.name} 🎊
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
      Discover Our Third Top Beautician: Visionary Beauty Expert!
      <br /><br />
      Total Bookings <span className='text-info text-medium'>{ranking.third.appointment_count}</span> 
         
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button variant="solid" color="warning"  onClick={() => booknowHandler(ranking.third.id)}>
        Book Now
        </Button>
        <AddToFavouritesModal myid={ranking.third.id}/>
      </CardActions>
    </Card>


          </div>
        </div>
      )}
    </>
  );
};

export default TopBeauticians;
