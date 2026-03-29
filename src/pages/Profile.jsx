import { useEffect, useRef, useState } from 'react'
import SkillPill from '../components/SkillPill'
import * as api from "../utils/api";
const starterSkills = ['React', 'TypeScript', 'AWS', 'Figma']

const profileStorageKey = 'find-it.profile'

export default function Profile(props) {
  const fileInputRef = useRef(null)
  const [profile, setProfile] = useState(structuredClone(props.user))
  const [skills, setSkills] = useState(starterSkills)
  const [skillInput, setSkillInput] = useState('')
  const [saveStatus, setSaveStatus] = useState('')
  const [form,setForm] = useState();

  useEffect(() => {
    if (props.user)
    {
      console.log(props.user);
      setProfile(structuredClone(props.user));
    }
    setForm({
        Firstname: profile.firstName || '',
        Lastname: profile.lastName || '',
        Gender: profile.gender || '',
      });
  }, [props.user])

  useEffect(()=> {
      loadSkills();
  },[])


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
   
  }

  const handleSave = async () => {
    //api call to update the user
    let response = await api.users.updateUser(profile);
    if (response.ok)
    {
      props.updateUser(profile);
    }
    else
    {
      //error handling code... idk what to do lol
    }

  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
      <div className="flex w-full flex-col gap-6 lg:max-w-sm">
        <div className="soft-card flex flex-col items-center gap-4 p-8">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-amber-300/40 bg-gradient-to-br from-amber-300/40 via-zinc-900 to-black">
            {/*profile.avatar ? (
               <img src={profile.avatar} alt="Profile avatar" className="h-full w-full object-cover" />
            ) : */ null}
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
          <h3 className="mt-4 text-xl font-semibold text-white">{profile.salutation} {profile.firstName} {profile.lastName}</h3>
          <p className="mt-1 text-sm text-zinc-400">
            {profile.age}
          </p>
          {/*<p className="mt-2 text-xs text-zinc-500">{profile.location}</p>
          <p className="mt-4 text-sm text-zinc-300">{profile.bio}</p> */}
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
            <input className="input" value={profile.salutation} onChange={handleProfileChange('salutation')} />
          </div>
          <div>
            <p className="label mb-2">First Name</p>
            <input className="input" value={profile.firstName} onChange={handleProfileChange('Firstname')} />
          </div>
          <div>
            <p className="label mb-2">Last Name</p>
            <input className="input" value={profile.lastName} onChange={handleProfileChange('Lastname')} />
          </div>
          <div>
            <p className="label mb-2">Age</p>
            <input className="input" value={profile.age} onChange={handleProfileChange('Age')} />
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
