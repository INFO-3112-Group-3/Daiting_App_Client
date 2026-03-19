import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'

function App() {

  //state that will store the user that is currently logged in
  const [user, setUser] = useState();

  //function that will be send to the login component to update 
  const updateUser = ((selUser) =>
  {
    console.log(selUser);
    setUser({...selUser})
    ;
    //if the user doesn't have a first name (I.E hasn't fully set up their profile, send them to the profile screen)
    //so they are forced to do so before acsessing the rest of the page
  });
  //general method for switching between pages
  const router = ((page) => {
    setPageToView(page);
  })

  const [pageToView, setPageToView] = useState("Login"); 

  return (
    <>
      {pageToView === "Login" && (
        <Login updateUser={updateUser} router={router}/>
      )}
      {pageToView === "Register" && (
        <Register router={router}/>
      )}
      {pageToView === "Home" && (
        <Home user={user} router={router}/>
      )}
      {pageToView === "Profile" && (
        <Profile user={user} router={router} updateUser={updateUser}/>
      )}
  </>)
}

export default App