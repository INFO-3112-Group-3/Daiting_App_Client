import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'
import { users } from '../utils/api'

export default function EditProfilePage({ user, updateUser }) {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  console.log("LOGIN USER:", user)

  // Full user data, do not send to API, contains password hash.
  const [fullUser, setFullUser] = useState(null)

  // Form state for editable fields.
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    orientation: '',
    city: '',
    region: '',
    occupation: '',
    notes: ''
  })

  // Separate handler for multi skills field.
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState([])

  // Load user info when props change.
  useEffect(() => {
    async function loadUser() {
      if (!user?.email) return

      const data = await users.getUserInformation(user.email)
      console.log("FULL USER API RESPONSE:", data)
      setFullUser(data)

      setForm({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        gender: data.gender || '',
        orientation: data.orientation || '',
        city: data.city || '',
        region: data.region || '',
        occupation: data.occupation || '',
        notes: data.notes || ''
      })

      setSkills(data.skills || [])

      setLoading(false)
    }

    loadUser()
  }, [user])

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value
    }))
  }

  // Accept profile changes, update user on server and in app state, then navigate to profile.
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullUser) return

    const { password, ...safeUser } = fullUser

    const updatedUser = {
      ...safeUser,
      ...form,
      skills: skills
    }

    await users.update(updatedUser)
    updateUser(updatedUser)

    navigate('/profile')
  }

  // Control if fields are editable.
  const [editable, setEditable] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    orientation: false,
    city: false,
    region: false,
    occupation: false,
    notes: false,
    skills: false 
  })

  // Toggle edit mode.
  const toggleEdit = (field) => {
    setEditable((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  // Field which can be edited, with an edit/lock button.
  const renderEditableField = (fieldKey, label, placeholder) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-white">{label}:</span>

        <InputField
          name={fieldKey}
          value={form[fieldKey] || ''}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={!editable[fieldKey]}
        />

        <button
          type="button"
          onClick={() => toggleEdit(fieldKey)}
          className="text-sm text-blue-400"
        >
          {editable[fieldKey] ? "Lock" : "Edit"}
        </button>
      </div>
    )
  }

  // Skills field functionality.

  const addSkill = () => {
    if (!skillInput.trim()) return

    setSkills((prev) => [...prev, skillInput.trim()])
    setSkillInput('')
  }

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const renderSkillsField = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">Skills:</span>

          <button
            type="button"
            onClick={() => toggleEdit("skills")}
            className="text-sm text-blue-400"
          >
            {editable.skills ? "Lock" : "Edit"}
          </button>
        </div>

        {/* Input only enabled when editing */}
        {editable.skills && (
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add a skill"
              className="flex-1 rounded bg-[#1B1B24] text-white px-3 py-2"
            />

            <button
              type="button"
              onClick={addSkill}
              className="text-sm text-blue-400"
            >
              Add
            </button>
          </div>
        )}

        {/* Skill list */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#2A2A36] px-3 py-1 rounded-full text-white text-sm"
            >
              {skill}

              {editable.skills && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-400"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////
  // Rendering....
  //
  //


  // So it wont explode when user isnt loaded yet.
  if (loading) {
    return <div className="p-6 text-white">Loading profile...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-xl text-white mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {renderEditableField("firstName", "First Name", "First Name")}
        {renderEditableField("lastName", "Last Name", "Last Name")}
        {renderEditableField("gender", "Gender", "Gender")}
        {renderEditableField("orientation", "Orientation", "Orientation")}
        {renderEditableField("city", "City", "City")}
        {renderEditableField("region", "Region", "Region")}
        {renderEditableField("occupation", "Occupation", "Occupation")}
        {renderSkillsField()}
        {renderEditableField("notes", "Notes", "Notes")}

        <Button type="submit" variant="gradient">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
