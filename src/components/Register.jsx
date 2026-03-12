import {useState} from "react";

import {Paper,TextField, Button} from "@mui/material";
import * as api from "../utils/api";
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const Register = (async () => {
      //call api to verify the user name and password is correct
      let response = await api.users.register(userName,email,password)
      //if its correct
      if (response.ok)
      {
        props.switchToLogin();
      }
      else
      {
        //STUB: once desgin has been finalized, lmk so I can add in this invalid message in a way that makes sense
        const errorText = await response.text();
        console.error(`Register failed: ${errorText}`);
      }
    })
    //NOTE: these are stub componets for the desgin, change for actaul development
    return(
    <>
        <TextField fullWidth label="User name"
        sx={{mb: "1em"}}
        value={userName}
        onChange={(e) =>{setUserName(e.target.value); }}
      />
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
      <Button fullWidth variant="contained" onClick={Register}>
                Register
       </Button>

    </>)
};

export default Register;