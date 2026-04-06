import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button';
import SkillPill from '../components/SkillPill'
import { InputField } from '../components/InputField';
import * as api from "../utils/api";
import TagInput from '../components/TagInput';

export default function Profile(props) {
  //////////////////////////////////////////////////////////////////////
  // States....
  //  - 'isDataLoading' : while fetching user data from server.
  //
  //  - 'fullUser': to store complete user data from server.
  //        NOTE: right now props props.user does not contain the user info, ITS IN props.user.user.
  //              Yeah idk why...
  //
  //  - 'inputFormData' :
  //      form state for editable fields.
  //      Declared in the same order as the JSON object excluding the 'id' field.
  //
  //  - 'isFormFieldEditable' : to control which fields are currently editable.
  //
  //  - 'saveStatus' :
  //        to display status message after saving changes. When empty string, no message is displayed.
  //        Set to "Success" or "Failed" based on save result inside 'handleFormSubmission'.
  //////////////////////////////////////////////////////////////////////
  const [isDataLoading, setisDataLoading] = useState(true)
  const [fullUser, setFullUser] = useState(null)
  const [inputFormData, setInputFormData] = useState({
    nickname: '',
    email: '',
    firstName: '',
    lastName: '',
    isPaidUser: false,
    contactInfo: '',
    contactMethod: '',
    gender: '',
    city: '',
    region: '',
    dateOfBirth: '',
    interests: [],
    skills: [],
    preferences: [],
    bio: '',
    profilePictureBase64: null
  })
  const [isFormFieldEditable, setIsFormFieldEditable] = useState({
    nickname: false,
    email: false,
    firstName: false,
    lastName: false,
    isPaidUser: false,
    contactInfo: false,
    contactMethod: false,
    gender: false,
    city: false,
    region: false,
    dateOfBirth: false,
    interests: false,
    skills: false,
    preferences: false
  })
  const [saveStatus, setSaveStatus] = useState('')

  // Skills related states.
  const [allSkillOptions, setAllSkillOptions] = useState([]);   // All skill options from the server for the skills field.
  const [userSkills, setUserSkills] = useState([]);       // User's current skills for the skills field.
  const [skillInput, setSkillInput] = useState("")        // Controlled input state for adding skills.

  // Ref for the hidden file input for avatar upload.
  const uploadedProfilePictureFile = useRef(null)

  //////////////////////////////////////////////////////////////////////
  // Functionality....
  //  - 'UseEffect.loadUser' :
  //      Load user data from server when component mounts or when 'props.user' changes.
  //
  //  - 'handleInputFormChanges' :
  //      Update input form state on change for controlled inputs.
  //
  //  - 'toggleFormFieldEditable' :
  //      Toggles the 'editable' state for the given field key.
  //
  //  - 'handleFormSubmission' :
  //      Called when the user clicks the "Save Changes" button.
  //      Sends updated profile data to server, updates app state and reloads profile data.
  //////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function loadUser() {
      if (!props.user) {
        console.warn("No user in props, cannot load profile data.")
        return;
      }

      // Yeah idk why its stored like this.....
      if (!props.user.user) {
        console.warn("Invalid user data, cannot load profile data.")
        return;
      }

      const data = await api.users.getUserInformation(props.user.user.id);
      setFullUser(data)

      // Validated all user data and console log for debugging if they are not present.
      if (!data.nickname) console.warn("User data missing 'nickname' field.")
      if (!data.email) console.warn("User data missing 'email' field.")
      if (!data.firstName) console.warn("User data missing 'firstName' field.")
      if (!data.lastName) console.warn("User data missing 'lastName' field.")
      if (data.isPaidUser === undefined) console.warn("User data missing 'isPaidUser' field.")
      if (!data.contactInfo) console.warn("User data missing 'contactInfo' field.")
      if (!data.contactMethod) console.warn("User data missing 'contactMethod' field")
      if (!data.gender) console.warn("User data missing 'gender' field.")
      if (!data.city) console.warn("User data missing 'city' field.")
      if (!data.region) console.warn("User data missing 'region' field.")
      if (!data.dateOfBirth) console.warn("User data missing 'dateOfBirth' field.")
      if (!data.interests) console.warn("User data missing 'interests' field.")
      if (!data.skills) console.warn("User data missing 'skills' field.")
      if (!data.preferences) console.warn("User data missing 'preferences' field.")
      if (!data.bio) console.warn("User data missing 'bio' field.")
      if (!data.profilePictureBase64) console.warn("User data missing 'profilePictureBase64' field.")

      setUserSkills(data.skills || [])

      setInputFormData({
        nickname: data.nickname || '',
        email: data.email || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        isPaidUser: data.isPaidUser || false,
        contactInfo: data.contactInfo || '',
        contactMethod: data.contactMethod || '',
        gender: data.gender || '',
        city: data.city || '',
        region: data.region || '',
        dateOfBirth: data.dateOfBirth || '',
        interests: data.interests || [],
        skills: data.skills || [],
        preferences: data.preferences || [],
        bio: data.bio || '',
        profilePictureBase64: data.profilePictureBase64 || null
      })

      setisDataLoading(false)
    }

    loadUser()
  }, [props.user])

  const handleInputFormChanges = ({ target }) => {
    setInputFormData((prev) => ({
      ...prev,
      [target.name]: target.value
    }))
  }

  const toggleFormFieldEditable = (field) => {
    if (field === "email") {
      alert("Email cannot be edited.")
      return;
    }

    setIsFormFieldEditable((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleFormSubmission = async (e) => {
    e.preventDefault()

    if (!fullUser) return

    const updatedProfile = {
      ...fullUser,
      nickname: inputFormData.nickname,
      email: inputFormData.email,
      firstName: inputFormData.firstName,
      lastName: inputFormData.lastName,
      isPaidUser: inputFormData.isPaidUser,
      contactInfo: inputFormData.contactInfo,
      contactMethod: inputFormData.contactMethod,
      gender: inputFormData.gender,
      city: inputFormData.city,
      region: inputFormData.region,
      dateOfBirth: inputFormData.dateOfBirth,
      interests: inputFormData.interests,
      skills: userSkills,
      preferences: inputFormData.preferences,
      bio: inputFormData.bio,
    }

    const res = await api.users.update(updatedProfile)

    if (!res.ok) {
      console.error(await res.text())
      setSaveStatus("Failed")
      return
    }

    const updatedUser = await api.users.getUserInformation(props.user.user.id);
    setFullUser(updatedUser);
    setInputFormData(updatedUser);
    props.updateUser({ ...props.user, user: updatedUser });
    setSaveStatus("Success")

    // Reset all fields to non-editable after saving.
    setIsFormFieldEditable({
      nickname: false,
      email: false,
      firstName: false,
      lastName: false,
      isPaidUser: false,
      contactInfo: false,
      contactMethod: false,
      gender: false,
      city: false,
      region: false,
      dateOfBirth: false,
      interests: false,
      skills: false,
      preferences: false,
      bio: false
    })
  }

  const loadSkills = async () => {
    let response = await api.skills.getSkills();
    setAllSkillOptions(response);
  }

  const addSkill = (event) => {
    event.preventDefault();

    // Only add skill if it's not already in the user's skills and is a valid skill option.
    if (skillInput && !userSkills.includes(skillInput) && allSkillOptions.some(option => option.name === skillInput)) {
      setUserSkills((prev) => [...prev, skillInput]);
      setInputFormData((prev) => ({ ...prev, [userSkills]: userSkills }));
    } else {
      alert("Please select a valid skill that is not already added.")
    }
  }

  const removeSkill = (skill) => {
    setUserSkills((prev) => prev.filter((item) => item !== skill))
  }

  useEffect(() => {
    loadSkills();
  }, [])

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // convert image → base64
      const base64 = await api.PictureToBase64(file);

      // update local UI immediately (instant preview)
      setFullUser((prev) => ({
        ...prev,
        profilePictureBase64: base64
      }));

      // send to backend
      const updatedUser = {
        ...fullUser,
        profilePictureBase64: base64
      };

      const res = await api.users.update(updatedUser);

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      console.log("Avatar updated");
    } catch (err) {
      console.error("Failed to upload avatar:", err);
    }
  };


  const setInterests = (newInterests) => {

    setInputFormData((prev) => ({
      ...prev,
      interests:
        typeof newInterests === "function"
          ? newInterests(prev.interests)  // TagInput provides the new interests as a function when updating,
          // so we need to call it with the previous interests to get the new value.
          : Array.isArray(newInterests)   // If it's an array, we can set it directly.
            ? newInterests
            : []
    }));
  };

  //////////////////////////////////////////////////////////////////////
  // Rendering....
  //  - Dont display page based on isDataLoading state while fetching user data.  (No null errors!)
  //  - renderEditableTextField : Renders editable text fields.
  //  - Save button at the end to submit changes wired to 'handleFormSubmission' function.
  //
  //  - TODO: Interests field
  //  - TODO: Date of Birth field
  //////////////////////////////////////////////////////////////////////
  const renderEditableTextField = (fieldKey, label, placeholder, multiline = false) => {
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="label">{label}</p>
          <button
            type="button"
            onClick={() => toggleFormFieldEditable(fieldKey)}
            className="text-sm text-blue-400"
          >
            {isFormFieldEditable[fieldKey] ? "Lock" : "Edit"}
          </button>
        </div>
        {multiline ? (
          <textarea
            className="input min-h-[120px] resize-y"
            name={fieldKey}
            value={inputFormData[fieldKey] || ''}
            onChange={handleInputFormChanges}
            placeholder={placeholder}
            disabled={!isFormFieldEditable[fieldKey]}
          />
        ) : (
          <input
            className="input"
            name={fieldKey}
            value={inputFormData[fieldKey] || ''}
            onChange={handleInputFormChanges}
            placeholder={placeholder}
            disabled={!isFormFieldEditable[fieldKey]}
          />
        )}
      </div>
    );
  }

  const renderEditableSkillsField = () => {
    return (
      <div>
        <p className="label mb-2">Skill Stack</p>
        <form onSubmit={addSkill} className="flex flex-col gap-3 sm:flex-row">
          <select name="day" className="input"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}>
            {Array.from(allSkillOptions).map((skill) => {
              return <option key={skill.id} value={skill.name}>{skill.name}</option>
            })}
          </select>
          <button
            type="submit"
            className="rounded-2xl border border-amber-300/60 bg-amber-300/15 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"

          >
            Add Skill
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {userSkills.map((skill) => (
            <SkillPill key={skill} label={skill} onRemove={() => removeSkill(skill)} />
          ))}
        </div>
      </div>)
  }

  const renderProfileHeader = () => {
    return (<div className="flex w-full flex-col gap-6 lg:max-w-sm">
      <div className="soft-card flex flex-col items-center gap-4 p-8">
        <div className="h-28 w-28 overflow-hidden rounded-full border border-amber-300/40 bg-gradient-to-br from-amber-300/40 via-zinc-900 to-black">
          {fullUser.profilePictureBase64 ? (
            <img src={fullUser.profilePictureBase64} alt="Profile avatar" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <input
          ref={uploadedProfilePictureFile}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        <button
          type="button"
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400"
          onClick={() => uploadedProfilePictureFile.current?.click()}
        >
          Upload Avatar
        </button>
        <p className="mt-4 text-xl font-semibold text-white">
          {fullUser.firstName} {fullUser.lastName} aka {fullUser.nickname}
        </p>
        <p className="mt-2 text-xs text-zinc-300">{api.GenderToString(fullUser.gender)}</p>
        <p className="mt-4 text-sm text-zinc-300">
          Age {api.getUserAge(fullUser.dateOfBirth)} | Born {api.formatBirthdayDate(fullUser.dateOfBirth)}
        </p>
        <p className="mt-2 text-xs text-zinc-500">{fullUser.city}, {fullUser.region}</p>
        <p className="mt-4 text-sm text-zinc-300">{fullUser.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
          {userSkills.map((skill) => {
            return (
              <span
                key={skill}
                className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1"
              >
                {skill}
              </span>)
          })}
          {fullUser.interests.map((skill) => {
            return (
              <span
                key={skill}
                className="rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1"
              >
                {skill}
              </span>)
          })}
        </div>
      </div>
    </div>)
  }

  if (isDataLoading) {
    return <div className="p-6 text-white">Loading profile...</div>
  }


  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
      <div className="soft-card w-full p-8">
        {renderProfileHeader()}
        <div className="grid gap-6">
          <form onSubmit={handleFormSubmission} className="flex flex-col gap-4">
            {renderEditableTextField("nickname", "Nickname", "Nickname")}
            {renderEditableTextField("firstName", "First Name", "First Name")}
            {renderEditableTextField("lastName", "Last Name", "Last Name")}
            {renderEditableTextField("contactInfo", "Contact Info", "Contact Info")}
            {renderEditableTextField("contactMethod", "Contact Method", "Contact Method")}
            {renderEditableTextField("city", "City", "City")}
            {renderEditableTextField("region", "Region", "Region")}
            {renderEditableTextField("bio", "Bio", "Tell us about yourself...", true)}
            <TagInput
              label="Interests"
              values={inputFormData.interests}
              setValues={setInterests}
              editable={isFormFieldEditable.interests}
              toggleEdit={() => toggleFormFieldEditable("interests")}
            />
          </form>
          {renderEditableSkillsField()}
          <button
            type="button"
            className="w-full rounded-2xl border border-amber-300/60 bg-amber-300/15 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
            onClick={handleFormSubmission}
          >
            {saveStatus ? `Profile Update ${saveStatus}` : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}
