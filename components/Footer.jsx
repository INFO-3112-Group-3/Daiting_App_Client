import { Link } from 'react-router-dom'

const links = [
  { label: 'Register', to: '/signup' },
  { label: 'Sign In', to: '/signin' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-black/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Luxury matchmaking for engineers, architects, and builders.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Find IT</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          All Systems Operational
        </div>
      </div>
    </footer>
  )
}
