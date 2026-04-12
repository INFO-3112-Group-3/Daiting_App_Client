import { useState } from 'react'
import * as api from '../utils/api';

export default function AdminDashboard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [stats, setStats] = useState([]);
  
  const handleLogin = async (event) => {
    event.preventDefault()
    setLoggedIn(true)

    let response = await api.stats.getAllStats();

    setStats(Object.entries(response));
    console.log(Object.entries(response))
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
      <div>
        <p className="label">Admin</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Operations dashboard</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Admin-only overview of key membership and matching metrics.
        </p>
      </div>

      {!loggedIn ? (
        <div className="soft-card w-full max-w-md p-6">
          <h3 className="text-lg font-semibold text-white">Admin login</h3>
          <form onSubmit={handleLogin} className="mt-4 space-y-3">
            <input
              className="input"
              type="email"
              placeholder="admin@findit.love"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-2xl border border-amber-300/60 bg-amber-300/15 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
            >
              Sign in
            </button>
          </form>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat[0]} className="soft-card p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{stat[0]}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stat[1]}</p>
              <p className="mt-2 text-xs text-zinc-400">Last updated 5 minutes ago</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}