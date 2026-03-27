import { Link, NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'My Profile', to: '/profile' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-rose/40 bg-rose/10 text-rose">
            <Sparkles size={18} />
          </span>
          Find IT
        </Link>
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
        <Link
          to="/signin"
          className="rounded-full border border-amber-300/40 bg-amber-300/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/20"
        >
          Login
        </Link>
      </div>
    </header>
  )
}
