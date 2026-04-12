import SkillPill from './SkillPill'

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="soft-card overflow-hidden">
      <div className="relative h-80 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(56,189,248,0.15),transparent_55%),linear-gradient(220deg,rgba(244,114,182,0.2),transparent_60%)]" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="label">Now Online</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {profile.firstName} {profile.lastName}, {profile.age}
          </h3>
        </div>
      </div>
      <div className="space-y-5 px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <SkillPill key={skill} label={skill} />
          ))}
          {profile.skills?.length === 0 && <span className="text-xs text-zinc-500 italic">No skills listed</span>}
        </div>
        <p className="text-sm text-zinc-300">{profile.bio}</p>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{profile.city}</span>
          <span>Verified • LoveTech</span>
        </div>
      </div>
    </div>
  )
}
