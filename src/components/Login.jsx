import {useState} from "react";

import {Paper,TextField, Button} from "@mui/material";
import * as api from "../utils/api";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LogIn = (async () => {
      //call api to verify the user name and password is correct
      let response = await api.users.login(email,password);
      //if its correct and can sucsessful login
     if (response.message == "Login succssful!")
     {
       //retrive user from the database to then update the logined user
      let user = await api.users.getUserInformation(email);
      props.updateUser(user);
      console.log("Login worky");
      console.log(user);
     }
     else
     {
      //STUB: once desgin has been finalized, lmk so I can add in this invalid message in a way that makes sense
     }
    })
    //NOTE: these are stub componets for the desgin, change for actaul development
    return(
    <>
      <TextField fullWidth label="User Name"
        sx={{mb: "1em"}}
        value={userName}
        onChange={(e) =>{setUserName(e.target.value); }}
      />
      <TextField fullWidth label="Password"
        sx={{mb: "1em"}}
        value={password}
        onChange={(e) =>{setPassword(e.target.value); }}
      />
      <Button fullWidth variant="contained" onClick={LogIn}>
                Log In
       </Button>

    </>)
};

export default Login;