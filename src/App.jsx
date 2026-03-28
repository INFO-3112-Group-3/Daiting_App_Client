import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Discover from './pages/Discover'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SimplePage from './pages/SimplePage'
import {useState} from "react"
import * as api from "../src/utils/api"
export default function App() {
 
 let [user,setUser] = useState();
 
  
 const updateUser = (currentUser) => {

    setUser(currentUser.user);
 }
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="min-h-screen bg-hero-radial">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn updateUser={updateUser}/>} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile user={user} updateUser={updateUser}/>} />
            <Route
              path="/about"
              element={
                <SimplePage
                  title="About Find IT"
                  description="Find IT pairs high-caliber technologists by blending personal chemistry with stack alignment."
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <SimplePage
                  title="Privacy"
                  description="Your data is encrypted at rest and shared only with matches you approve."
                />
              }
            />
            <Route
              path="/terms"
              element={
                <SimplePage
                  title="Terms"
                  description="Membership is invite-only and bound to professional standards and respectful conduct."
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}
