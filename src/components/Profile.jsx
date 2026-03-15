import {useState} from "react";

import {Paper,TextField, Button} from "@mui/material";
import * as api from "../utils/api";

const Profile = (props) => {

    //setting this so incase changes/anything aren't saved
    const [userBeforeChanges, setUserBeforeChanges] = useState(props.user);
    const [editAcsess, setEditAcsess] = useState(props.user.FirstName != null) //control variable that will let them acsess/edit the profile
    //this is done cause updating the values of the passed user object form the main apps state
    //is a no-no
    const [currentUser,setCurrentUser] = useState(structuredClone(props.user));

    const update = (async () => {
        setEditAcsess(true);
        let response = await api.users.update(currentUser);
        props.updateUser(currentUser);
    });

    const goHome = (() => {
        props.router("Home");
    });
    //very basic implemntation, change if/when nessesary, just using these text feilds for now
    //add any other "basic" information you deem as nessisary and just send a message in the discord so this can be updated
    
    //and yes.. this is dumb bad awful way to do this, just have these set up for testing of the functionality
    // free to change any/all of these things int teh final desgin
    return(
    <>
    <TextField fullWidth label="First Name"
        sx={{mb: "1em"}}
        value={currentUser.FirstName}
        onChange={(e) => setCurrentUser({
            ...currentUser,
            FirstName: e.target.value
        })
        }
        disabled={editAcsess}
    />
    <TextField fullWidth label="Last Name"
        sx={{mb: "1em"}}
        value={currentUser.LastName}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            LastName: e.target.value
        })}}
        disabled={editAcsess}
    />
    <TextField fullWidth label="Gender"  //note this element SHOULD be a drop down menu... i am just lazy
        sx={{mb: "1em"}}
        value={currentUser.Gender}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            Gender: e.target.value
        })}}
        disabled={editAcsess}
    />
    <TextField fullWidth label="Orientation" //also should be a drop down menu...
        sx={{mb: "1em"}}
        value={currentUser.Orientation}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            Orientation: e.target.value
        })}}
        disabled={editAcsess}
    />
    <TextField fullWidth label="Occupaction" 
        sx={{mb: "1em"}}
        value={currentUser.Occupaction}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            Occupaction: e.target.value
        })}}
        disabled={editAcsess}
    />
    <TextField fullWidth label="Intrests" //should be a text area
        sx={{mb: "1em"}}
        value={currentUser.Intrests}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            Intrests: e.target.value
        })}}
        disabled={editAcsess}
    />
    <TextField fullWidth label="Skills" //should be a text area
        sx={{mb: "1em"}}
        value={currentUser.Skills}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            Skills: e.target.value
        })}}
        disabled={editAcsess}
    />
    <TextField fullWidth label="Note" //should be a text area
        sx={{mb: "1em"}}
        value={currentUser.Note}
        onChange={(e) =>{setCurrentUser({
            ...currentUser,
            Note: e.target.value
        })}}
        disabled={editAcsess}
    />
    <Button fullWidth variant="contained" onClick={update}>
                {props.user.FirstName ? "Save Changes" : "Finish Profile!"}
       </Button>
    </>)
};

export default Profile;