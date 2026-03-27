import { useEffect, useRef, useState } from 'react'
import SkillPill from '../components/SkillPill'

const starterSkills = ['React', 'TypeScript', 'AWS', 'Figma']
const defaultProfile = {
  name: 'Olivia Ellenpark',
  age: '28',
  role: 'Full Stack Engineer',
  location: 'San Francisco, CA',
  bio: 'Shipping resilient product, searching for a partner who understands the magic in clean architecture.',
  avatar: '',
}

const profileStorageKey = 'find-it.profile'

export default function Profile() {
  const fileInputRef = useRef(null)
  const [profile, setProfile] = useState(defaultProfile)
  const [skills, setSkills] = useState(starterSkills)
  const [skillInput, setSkillInput] = useState('')
  const [saveStatus, setSaveStatus] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(profileStorageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProfile((prev) => ({ ...prev, ...parsed }))
        if (parsed.skills) setSkills(parsed.skills)
      } catch {
        setProfile(defaultProfile)
      }
    }
  }, [])

  const addSkill = (event) => {
    event.preventDefault()
    const trimmed = skillInput.trim()
    if (!trimmed || skills.includes(trimmed)) return
    setSkills((prev) => [...prev, trimmed])
    setSkillInput('')
  }

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((item) => item !== skill))
  }

  const handleProfileChange = (field) => (event) => {
    setProfile((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfile((prev) => ({ ...prev, avatar: reader.result }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    const payload = { ...profile, skills }
    localStorage.setItem(profileStorageKey, JSON.stringify(payload))
    setSaveStatus('Saved')
    setTimeout(() => setSaveStatus(''), 1500)
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
      <div className="flex w-full flex-col gap-6 lg:max-w-sm">
        <div className="soft-card flex flex-col items-center gap-4 p-8">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-amber-300/40 bg-gradient-to-br from-amber-300/40 via-zinc-900 to-black">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile avatar" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Avatar
          </button>
          <p className="text-xs text-zinc-500">PNG or JPG, 2MB max.</p>
        </div>
        <div className="soft-card p-6">
          <p className="label">Profile Snapshot</p>
          <h3 className="mt-4 text-xl font-semibold text-white">{profile.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">
            {profile.age} • {profile.role}
          </p>
          <p className="mt-2 text-xs text-zinc-500">{profile.location}</p>
          <p className="mt-4 text-sm text-zinc-300">{profile.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="soft-card w-full p-8">
        <div className="grid gap-6">
          <div>
            <p className="label mb-2">Salutation</p>
            <input className="input" value={profile.firstname} onChange={handleProfileChange('name')} />
          </div>
          <div>
            <p className="label mb-2">First Name</p>
            <input className="input" value={profile.firstname} onChange={handleProfileChange('name')} />
          </div>
          <div>
            <p className="label mb-2">Last Name</p>
            <input className="input" value={profile.lastname} onChange={handleProfileChange('name')} />
          </div>
          <div>
            <p className="label mb-2">Age</p>
            <input className="input" value={profile.age} onChange={handleProfileChange('age')} />
          </div>
          <div>
            <p className="label mb-2">Role</p>
            <input className="input" value={profile.role} onChange={handleProfileChange('role')} />
          </div>
          <div>
            <p className="label mb-2">Location</p>
            <input className="input" value={profile.location} onChange={handleProfileChange('location')} />
          </div>
          <div>
            <p className="label mb-2">Bio</p>
            <textarea
              rows={4}
              className="input"
              value={profile.bio}
              onChange={handleProfileChange('bio')}
            />
          </div>
          <div>
            <p className="label mb-2">Skill Stack</p>
            <form onSubmit={addSkill} className="flex flex-col gap-3 sm:flex-row">
              <input
                className="input flex-1"
                placeholder="Type a skill and press enter"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
              />
              <button
                type="submit"
                className="rounded-2xl border border-amber-300/60 bg-amber-300/15 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
              >
                Add Skill
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillPill key={skill} label={skill} onRemove={() => removeSkill(skill)} />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-2xl border border-amber-300/60 bg-amber-300/15 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
            onClick={handleSave}
          >
            {saveStatus ? `Profile ${saveStatus}` : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}
