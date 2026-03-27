import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'
import { users } from '../utils/api'

export default function EditProfilePage({ user, updateUser }) {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  console.log("LOGIN USER:", user)

  const [fullUser, setFullUser] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullUser) return

    const updatedUser = {
      ...fullUser,
      ...form
    }

    await users.update(updatedUser)
    updateUser(updatedUser)

    navigate('/profile')
  }

  if (loading) {
    return <div className="p-6 text-white">Loading profile...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-xl text-white mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />

        <InputField
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <InputField
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
        />

        <InputField
          name="orientation"
          value={form.orientation}
          onChange={handleChange}
          placeholder="Orientation"
        />       

        <InputField
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
        />

        <InputField
          name="region"
          value={form.region}
          onChange={handleChange}
          placeholder="Region"
        />

        <InputField
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
          placeholder="Occupation"
        />

        <InputField
          name="notes"  
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
        />

        <Button type="submit" variant="gradient">
          Save Changes
        </Button>
      </form>
    </div>
  )
}