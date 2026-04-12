import { useEffect, useState } from 'react'
import * as api from '../utils/api';
import { UNSAFE_getTurboStreamSingleFetchDataStrategy } from 'react-router-dom';

export default function AdminDashboard() {



  const [stats, setStats] = useState([]);
  
  const getStats = async () =>
  {
    let response = await api.stats.getAllStats();

    setStats(Object.entries(response));
  }
  useEffect(() => {
    getStats();
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
      <div>
        <p className="label">Admin</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Operations dashboard</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Admin-only overview of key membership and matching metrics.
        </p>
      </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat[0]} className="soft-card p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{stat[0]}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{stat[1]}</p>
              <p className="mt-2 text-xs text-zinc-400">Last updated 5 minutes ago</p>
            </div>
          ))}
        </div>
      
    </div>
  )
}
