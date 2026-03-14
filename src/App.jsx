import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
function App() {

  //state that will store the user that is currently logged in
  const [user, setUser] = useState({Username: "jandoe", Password: "YES", Email: "Janedoe@email.com"});

  //function that will be send to the login component to update 
  const updateUser = ((user) =>
  {
    setUser(user);
    //if the user doesn't have a first name (I.E hasn't fully set up their profile, send them to the profile screen)
    //so they are forced to do so before acsessing the rest of the page
  });
  
  //general method for switching between pages
  const router = ((page, user = null) => {
    if (page == "Login")
    {
      setPageToView(<Login updateUser={updateUser} router={router}/>);
    }
    else if (page == "Register")
    {
      setPageToView(<Register router={router}/>);
    }
    else if (page =="Home")
    {
      setPageToView(<Home user={user} router ={router}/>);
    }
    else if (page =="Profile" && user != null) //should be impossible to be null, but gonna check anyway
    {
      setPageToView(<Profile user={user} router ={router} updateUser={updateUser}/>)
    }


  })

  const [pageToView, setPageToView] = useState(<Login updateUser={updateUser}/>); // this changes the page you are looking at
                                                           // because you can store react components as variables which is helpful

  return (
    <>
      {pageToView}
  </>)
}

export default App