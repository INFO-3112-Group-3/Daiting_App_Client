// App shell wires up navigation, shared layout, and per-route transitions.
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Heart, Home, User } from 'lucide-react'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ProfilePage from './pages/profile'
import MatchesPage from './pages/matches'
import { Footer } from './components/Footer'
import {useState} from 'react'

// Quick config for the desktop nav bar.
const navItems = [
	{ label: 'Home', path: '/', icon: Home },
	{ label: 'Matches', path: '/matches', icon: Heart },
	{ label: 'Profile', path: '/profile', icon: User },
]



function App() {
	
   const [user, setUser] = useState();

   //function that will be send to the login component to update 
   const updateUser = ((selUser) =>
   {
    console.log(selUser);
    setUser({...selUser});
    //if the user doesn't have a first name (I.E hasn't fully set up their profile, send them to the profile screen)
    //so they are forced to do so before acsessing the rest of the page
  	});
	
	// React Router gives us the location so AnimatePresence can animate route exits.
	const location = useLocation()

	return (
		<div className="app-shell min-h-screen">
			{/* Centered column mimics a mobile device viewport. */}
			<div className="mx-auto flex min-h-screen w-full max-w-[450px] flex-col px-4 pb-44 pt-8 md:px-6 md:pb-36">
				<header className="hidden items-center justify-between md:flex">
					{/* Brand lockup + app picker for desktop screens. */}
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5A7A] text-white">
							<Home className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-semibold text-white">Find IT</p>
							<p className="text-xs text-[#B9BAC6]">LoveTech</p>
						</div>
					</div>
					<nav className="flex items-center gap-2">
						{navItems.map((item) => (
							<NavLink
								key={item.path}
								to={item.path}
								className={({ isActive }) =>
									`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
										isActive
											? 'bg-[#1B1B24] text-white'
											: 'text-[#B9BAC6] hover:text-white'
									}`
								}
							>
								<item.icon className="h-4 w-4" />
								{item.label}
							</NavLink>
						))}
					</nav>
				</header>

				<main className="flex-1">
					<AnimatePresence mode="wait">
						{/* Match each route to a page and allow animated transitions. */}
						<Routes location={location} key={location.pathname}>
							<Route index element={<LoginPage updateUser={updateUser}/>} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/matches" element={<MatchesPage user={user}/>} />
							<Route path="/profile" element={<ProfilePage user={user}/>} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</AnimatePresence>
				</main>
			</div>

			{/* Sticky footer replicates the mobile tab bar vibe. */}
			<Footer />
		</div>
	)
}

export default App
