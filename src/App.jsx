import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
function App() {

  //state that will store the user that is currently logged in
  const [user, setUser] = useState();

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
