import {useState} from "react";

import {Paper,TextField, Button} from "@mui/material";
import * as api from "../utils/api";
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let user ={};
    const SignUp = ( () => {
      props.router("Register")
    })
    const LogIn = (async () => {
      //call api to verify the user name and password is correct
      let response = await api.users.login(email,password);
      //if its correct
      if (response.ok)
      {
        //retrieve user from the response to then update the logined user
        const user = await response.json();
        props.updateUser(user);
        if (user.FirstName != null)
        {
          props.router("Home");
        }
        else
        {
          props.router("Profile");
        }
      }
      else
      {
        //STUB: once desgin has been finalized, lmk so I can add in this invalid message in a way that makes sense
        const errorText = await response.text();
        console.error(`Login failed: ${errorText}`);
      }
    })
    //NOTE: these are stub componets for the desgin, change for actaul development
    return(
    <>
      <TextField fullWidth label="Email"
        sx={{mb: "1em"}}
        value={email}
        onChange={(e) =>{setEmail(e.target.value); }}
      />
      <TextField fullWidth label="Password"
        sx={{mb: "1em"}}
        value={password}
        onChange={(e) =>{setPassword(e.target.value); }}
      />
      <Button fullWidth variant="contained" onClick={LogIn}>
                Log In
       </Button>
       <Button fullWidth variant="contained" onClick={SignUp}>
                Sign Up
       </Button>

    </>)
};

export default Login;