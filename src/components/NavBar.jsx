import { Link, NavLink ,useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { label } from 'framer-motion/client';
import { matches } from '../utils/api';

// Base Navbar Items : These navbar items are always present at the top.
// - Label: The text that will be shown on the navbar.
// - To: The path that the user will be directed to when they click on the navbar item.
const baseNavItems = [
  { label: 'Home', to: '/'},
  { label: 'Sign Up', to: '/signup' },
  { label: 'About', to: '/about' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  
  // Only when logged in, see 'navItems' generation in NavBar component for more details.:
  //  { label: 'Matches', to: '/matches' },
  //  { label: 'Edit Profile', to: '/profile'}
]

export default function NavBar(props) {
  const navigate = useNavigate();

  // Actual Navbar Items
  // If the user is logged in, show the Edit Profile link in the nav bar.
  // Insert after the disco
  // !Based on if props.user is null or not.
  const navItems = props.user
    ? [
        ...baseNavItems.slice(0, 2), // Home and Discover
        { label: 'Matches', to: '/matches' },
        { label: 'Discover', to: '/discover' },
        { label: 'Edit Profile', to: '/profile' },
        ...baseNavItems.slice(2, 5), // Sign Up, About
      ]
    : baseNavItems;

  // Don't show the signup nav item if the user is logged in.
  if (props.user) {
    navItems.splice(navItems.findIndex(item => item.to === '/signup'), 1);
    if (props.user.user?.isAdminUser)
    { 
     navItems.push({ label: 'Admin Tools', to: '/admin' });
    }
    if (!props.user.user?.isPaidUser)
    {
     navItems.splice(navItems.findIndex(item => item.to === '/matches'),2);
    }

  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-rose/40 bg-rose/10 text-rose">
            <Sparkles size={18} />
          </span>
          Find IT
        </Link>
        {/* Generate Navigation Links based on 'navItems' object*/}
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `transition ${isActive ? 'text-white' : 'hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {/* If the user is not logged in, show the Login link */}
        {!props.user && (
          <Link
            to="/signin"
            className="rounded-full border border-amber-300/40 bg-amber-300/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/20"
          >
            Login
          </Link>
        )}
        {/* If the user is logged in, show a logout link */}
          {props.user && (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                props.setUser(null);
                navigate("/signin");
              }}
              className="rounded-full border border-rose/40 bg-rose/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(234,82,82,0.25)] transition hover:bg-rose/20"
            >
              Logout
            </button>
          )}
      </div>
    </header>
  )
}
