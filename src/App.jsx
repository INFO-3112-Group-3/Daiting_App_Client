import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
function App() {

  //state that will store the user that is currently logged in
  const [user, setUser] = useState();

  const [pageToView, setPageToView] = userState(<Login/>); // this changes the page you are looking at
                                                           // because you can store react components as variables which is helpful

  //function that will be send to the login component to update 
  const updateUser = ((user) =>
  {
    setUser(user);
    //defaulting to home page, with the logged in user as "loggedUser" 
    setPageToView(<Home props = {loggedUser = user} />);
  });

  return (
    <>
      {pageToView}
  </>)
}

export default App
