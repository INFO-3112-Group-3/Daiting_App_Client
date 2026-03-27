import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'
import { users } from '../utils/api'
import TagInput from '../components/TagInput'

export default function EditProfilePage({ user, updateUser }) {
  // Top navbar from App.jsx.
  const navigate = useNavigate()

  //////////////////////////////////////////////////////////////////////
  // States....
  //  - 'loading' while fetching user data from server.
  //  - 'fullUser' to store complete user data from server.
  //      (do not send to API, contains password hash.)
  //  - 'form' for controlled inputs of editable fields.
  //  - 'skills' and 'interests' for the tag input fields.
  //  - 'editable' to control which fields are currently editable.
  //////////////////////////////////////////////////////////////////////
  const [loading, setLoading] = useState(true) 
  const [fullUser, setFullUser] = useState(null) // Full user data, 
  const [form, setForm] = useState({   // Form state for editable fields.
    firstName: '',
    lastName: '',
    gender: '',
    orientation: '',
    city: '',
    region: '',
    occupation: '',
    notes: ''
  })

  const [skills, setSkills] = useState([])
  const [interests, setInterests] = useState([])
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

  //////////////////////////////////////////////////////////////////////
  // Functionality....
  //  - 'handleChange' for controlled inputs.
  //  - 'handleSubmit' to accept changes, update user on server and in app state, then navigate to profile.
  //  - 'toggleEdit' to toggle edit mode for each field.
  //  - 'useEffect' to load user info when props change.
  //////////////////////////////////////////////////////////////////////
  
  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullUser) return

    const updatedProfile = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      orientation: form.orientation,
      city: form.city,
      region: form.region,
      occupation: form.occupation,
      notes: form.notes,
      skills,
      interests
    }

    const res = await users.updateProfile(fullUser.username, updatedProfile)

    if (!res.ok) {
      console.error(await res.text())
      return
    }

    const updatedUser = await res.json()
    updateUser(updatedUser)

    navigate('/profile')
  }

  const toggleEdit = (field) => {
    setEditable((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

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
      setInterests(data.interests || [])

      setLoading(false)
    }

    loadUser()
  }, [user])

  //////////////////////////////////////////////////////////////////////
  // Rendering....
  //  - Loading state while fetching user data.
  //  - Editable fields:
  //      - 'renderEditableField' for simple text fields.
  //      - TagInput for skills/interests. -> from components/TagInput.jsx
  //  - Save button at the end to submit changes.
  //////////////////////////////////////////////////////////////////////

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
        <TagInput
          label="Skills"
          values={skills}
          setValues={setSkills}
          editable={editable.skills}
          toggleEdit={() => toggleEdit("skills")}
        />

        <TagInput
          label="Interests"
          values={interests}
          setValues={setInterests}
          editable={editable.interests}
          toggleEdit={() => toggleEdit("interests")}
        />
        {renderEditableField("notes", "Notes", "Notes")}

        <Button type="submit" variant="gradient">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
