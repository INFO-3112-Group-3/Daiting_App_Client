import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Discover from './pages/Discover'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MatchesPage from './pages/matches'
import SimplePage from './pages/SimplePage'
import { useState } from "react"
import * as api from "../src/utils/api"
import SuggestedMatches from './pages/SuggestedMatches'
import AdminDashboard from './pages/AdminDashboard'


export default function App() {
  // Saved user which has logged in previously.
  const savedUser = localStorage.getItem("user");

  // Currently logged in user state. If null, no user is logged in.
  // Note that the object format is { token: string, user: userObject } where 'userObject' contains all the user information.
  // Currently used by:
  // - NavBar: To conditionally render the navbar links.
  // - Profile: To display the user's profile information and allow editing.
  const [user, setUser] = useState(
    savedUser ? JSON.parse(savedUser) : null // See SignIn.handleSubmit for how the user gets set..
  );

  // Callback that will be sent to the login component to update current user state.
  const updateUser = ((currentUser) => {
    console.log(currentUser);
    setUser({ ...currentUser });
  });


  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="min-h-screen bg-hero-radial">
        {/* See "components/NavBar" for the items which are displayed based on user logged in status */}
        <NavBar user={user} setUser={setUser}/>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />                              {/* Main page which shows up by default */}
            <Route path="/signup" element={<SignUp />} />                         {/* Signup page */}
            <Route path="/signin" element={<SignIn updateUser={updateUser} />} /> {/* Signin page, button on the top right of navbar. */}
            <Route path="/matches" element={<MatchesPage />} />                   {/* Matches page, shows all the user's matches. */}
            <Route path="/discover" element={<Discover />} />                     {/* Discover page, shows potential matches based on swiping algorithm. */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/suggested"
              element={
                user ? <SuggestedMatches userId={user.id? user.id : user.user.id} /> : <></>
              }
            />
            <Route path="/profile" element={<Profile user={user} updateUser={updateUser} />} /> {/* User's profile to edit their information */}
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
