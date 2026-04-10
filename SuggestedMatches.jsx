import { useEffect, useState } from "react"
import * as api from "../utils/api"
import ConnectionModal from "../components/ConnectionModal"

export default function SuggestedMatches(props) {
  
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  const openConnection = (match) => {
    setSelectedMatch(match)
    setModalOpen(true)
  }

  useEffect(() => {

    const load = async () => {
      const data = await api.users.getSuggestedMatches(props.userId)

      // sort best matches first
      data.sort((a, b) => b.totalScore - a.totalScore)

      setMatches(data)
      setLoading(false)
    }

    load()
  }, [props.userId])

  if (loading) {
    return <div className="text-white p-10">Loading matches...</div>
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">
        Suggested Matches
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {matches.map((match) => (
          <div
            key={match.profile.id}
            className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
          >
            {/* IMAGE */}
            <div className="h-48 bg-zinc-800 overflow-hidden">
              {match.profile.profilePictureBase64 ? (
                <img
                  src={match.profile.profilePictureBase64}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-white">
                  {match.profile.firstName?.[0] || "?"}
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {match.profile.firstName} {match.profile.lastName}
                </h2>

                <span className="text-emerald-400 font-bold">
                  {match.totalScore}
                </span>
              </div>

              <p className="text-sm text-zinc-400 mt-1">
                {match.profile.city || "Unknown location"}
              </p>

              {/* BIO */}
              <p className="text-xs text-zinc-500 mt-2 line-clamp-2">
                {match.profile.bio || "No bio available"}
              </p>

              {/* TAGS (optional nice touch) */}
              <div className="flex flex-wrap gap-1 mt-3">
                {match.profile.skills?.slice(0, 2).map((i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-zinc-300"
                  >
                    {i}
                  </span>
                ))}

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openConnection(match)
                  }}
                  className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-rose-500 transition"
                >
                  ♥
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConnectionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        match={selectedMatch}
      />
    </div>
  )
}