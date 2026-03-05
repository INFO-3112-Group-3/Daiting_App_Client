import {useState} from "react";

import {Paper,TextField, Button} from "@mui/material";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const LogIn = (async () => {
        console.log(userName);
        console.log(password);
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