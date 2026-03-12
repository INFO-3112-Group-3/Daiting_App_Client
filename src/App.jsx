import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
function App() {

  //state that will store the user that is currently logged in
  const [user, setUser] = useState();

  //function that will be send to the login component to update 
  const updateUser = ((user) =>
  {
    setUser(user);
    //defaulting to home page, with the logged in user as "loggedUser" 
    router("Home",user);
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


  })

  const [pageToView, setPageToView] = useState(<Login updateUser={updateUser}/>); // this changes the page you are looking at
                                                           // because you can store react components as variables which is helpful

  return (
    <>
      {pageToView}
  </>)
}

export default App