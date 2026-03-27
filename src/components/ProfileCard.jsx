import SkillPill from './SkillPill'

export default function ProfileCard({ profile }) {
  return (
    <div className="soft-card overflow-hidden">
      <div className="relative h-80 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(56,189,248,0.15),transparent_55%),linear-gradient(220deg,rgba(244,114,182,0.2),transparent_60%)]" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="label">Now Online</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm text-zinc-300">{profile.role}</p>
        </div>
      </div>
      <div className="space-y-5 px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {profile.stack.map((skill) => (
            <SkillPill key={skill} label={skill} />
          ))}
        </div>
        <p className="text-sm text-zinc-300">{profile.bio}</p>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{profile.distance}</span>
          <span>Verified • LoveTech</span>
        </div>
      </div>
    </div>
  )
}
