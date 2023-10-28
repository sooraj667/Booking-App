import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  changePName,
  changeEmail,
  changePhone,
  changePassword,
  changeCpassword,
  
} from "../../../feautures/beautslice";
import { useDispatch,useSelector } from "react-redux";
import TextField from "@mui/material/TextField";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Signupform = () => {
  const dispatch = useDispatch();
  const datas=useSelector((state)=>state.signup)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={""} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onChange={(e) => dispatch(changePName(e.target.value))}
                />
                <span className="text-danger">{datas.value.error.pname}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Email"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => dispatch(changeEmail(e.target.value))}
                />
                <span className="text-danger">{datas.value.error.email}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Phone"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => dispatch(changePhone(e.target.value))}
                />
                <span className="text-danger">{datas.value.error.phone}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => dispatch(changePassword(e.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Re-enter Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => dispatch(changeCpassword(e.target.value))}
                />
                <span className="text-danger">{datas.value.error.cpassword}</span>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> */}
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>






    // <div>
    //   <div className="flex jsutify-around">
    //     <div className="f">
    //     <label for="username" className="mr-3">
    //           Name:
    //         </label>
    //         <input
    //           id="standard-basic"
    //           label=""
    //           className="form-control"
    //           // type="text"
    //           // id="username"
    //           // name="username"
    //           // class="form-control"
    //           // required
    //           onChange={(e) => dispatch(changePName(e.target.value))}
    //         />

    //     </div>
    //     <div className="s">
    //     <label for="username" className="mr-3">
    //           Name:
    //         </label>
    //         <input
    //           id="standard-basic"
    //           label=""
    //           className="form-control"
    //           // type="text"
    //           // id="username"
    //           // name="username"
    //           // class="form-control"
    //           // required
    //           onChange={(e) => dispatch(changePName(e.target.value))}
    //         />

    //     </div>


    //   </div>
    //   <div class="card-body">
    //     <div class="form-group">
    //       <div className="row">
    //         <label for="username" className="mr-3">
    //           Name:
    //         </label>
    //         <input
    //           id="standard-basic"
    //           label=""
    //           className="form-control"
    //           // type="text"
    //           // id="username"
    //           // name="username"
    //           // class="form-control"
    //           // required
    //           onChange={(e) => dispatch(changePName(e.target.value))}
    //         />
            
    //       </div>
    //       <span className="text-danger">{datas.value.error.pname}</span>
    //     </div>

    //     <div class="form-group">
    //       <div className="row">
    //         <label for="email" className="mr-3">
    //           Email:
    //         </label>
    //         <input
              
    //           className="form-control"
    //           onChange={(e) => dispatch(changeEmail(e.target.value))}
    //         />
    //       </div>
    //       <span className="text-danger">{datas.value.error.email}</span>
    //     </div>

    //     <div class="form-group">
    //       <div className="row">
    //         <label for="password" className="mr-3">
    //           Phone:
    //         </label>
    //         <input
    //           type="numtextber"
            
    //           className="form-control" 
            
    //           required
    //           onChange={(e) => dispatch(changePhone(e.target.value))}
    //         />
    //       </div>
    //       <span className="text-danger">{datas.value.error.phone}</span>
    //     </div>

    //     <div class="form-group">
    //       <div className="row">
    //         <label for="password" className="mr-3">Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           className="form-control"
           
    //           required
    //           onChange={(e) => dispatch(changePassword(e.target.value))}
    //         />
    //       </div>
    //     </div>

    //     <div class="form-group">
    //       <div className="row">
    //         <label for="password" className="">Retype Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
                
    //           className="form-control"
           
    //           required
    //           onChange={(e) => dispatch(changeCpassword(e.target.value))}
    //         />
    //       </div>
    //       <span className="text-danger">{datas.value.error.cpassword}</span>
    //     </div>

    //     <p class="mt-3 text-center">
    //       Already have an account? <a href="login.html">Login</a>
    //     </p>
    //   </div>
    // </div>
  );
};

export default Signupform;
