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
    ...form
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
    notes: false
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
        {renderEditableField("notes", "Notes", "Notes")}

        <Button type="submit" variant="gradient">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
