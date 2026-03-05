import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register'
function App() {

  //state that will store the user that is currently logged in
  const [user, setUser] = userState();

  //function that will be send to the login component to update 
  const updateUser = ((user) =>
  {
    setUser(user);
  });

  return (
    <>
      <Login props={updateUser}/>
  </>)
}

export default App
