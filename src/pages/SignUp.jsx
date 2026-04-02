import { Link , useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { InputField } from '../components/InputField'
import * as api from "../utils/api"
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function SignUp() {

    // Local form + preference state for the demo experience.
    const [form, setForm] = useState([]);
     const navigate = useNavigate();
    const [otherSelected, setOtherSelected] = useState(false);
    //const [selectedPrefs, setSelectedPrefs] = useState(new Set(preferenceOptions))
  
    // Toggle individual preference chips in a Set to simplify lookup.
    /*const togglePref = (option) => {
      setSelectedPrefs((prev) => {
        const next = new Set(prev)
        if (next.has(option)) {
          next.delete(option)
        } else {
          next.add(option)
        }
        return next
      })
    }
  */
    // Basic change handler shared across all text inputs.
    const handleChange = ({ target }) => {
      setForm((prev) => ({ ...prev, [target.name]: target.value }))
    }
  
    // Skip networking calls and forward the user into the app.
    const handleSubmit = async (event) => {
      event.preventDefault()
    let user = new Object();

    user.Salutation = form.salutation;
    user.Email = form.email;
    user.Password = form.password;
    user.Gender = form.gender;
    user.Firstname = form.firstname;
    user.Lastname = form.lastname;
    user.ContactInfo = form.contactinfo;
    user.ContactMethod = form.contactmethod;
    user.DateOfBirth = new Date(form.year,months.indexOf(form.month),form.day).toISOString().split('T')[0]; 
    let response = await api.users.register(user);
      //if its correct
      if (response.ok)
      {
       navigate('/signin');
      }
      else
      {
        //STUB: once desgin has been finalized, lmk so I can add in this invalid message in a way that makes sense
        const errorText = await response.text();
        console.error(`Register failed: ${errorText}`);
      }
    }
    
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16">
      <div className="soft-card w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-white">Sign up</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Build a profile that reflects your professional energy.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <InputField className="input" placeholder="Salutation" value={form.salutation} name="salutation" onChange={handleChange}/>
          <InputField className="input" placeholder="First Name" value={form.firstname} name="firstname" onChange={handleChange}/>
          <InputField className="input" placeholder="Last Name" value={form.lastname} name="lastname" onChange={handleChange}/>
          <InputField className="input" placeholder="Email Address" type="email" value={form.email} name="email" onChange={handleChange}/>
          <div className="relative">
            <InputField className="input pr-12" placeholder="Password" value={form.password} name="password" type="password" onChange={handleChange}/>
            <span className="pointer-events-none absolute right-4 top-3 text-xs text-zinc-500">show</span>
          </div>
          <div>
            <p className="label mb-2">Birthday</p>
            <div className="grid grid-cols-3 gap-2">
              <select name="month" className="input"
              value={form.month}
              onChange={handleChange}>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select name ="day" className="input"
              value={form.day}
              onChange={handleChange}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option  key={day} value={day}>{day}</option>
                ))}
              </select>
              <select name="year" className="input"
              value={form.year}
              onChange={handleChange}>
                {Array.from({ length: 60 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="label mb-2">Gender</p>
            <div className="flex gap-4 text-sm text-zinc-300">
              {['Female', 'Male'].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input type="radio" name="gender" className="accent-rose" value={value} onChange={(e)=> { setOtherSelected(false); handleChange(e)}}/>
                  {value}
                </label>
              ))}
              <label className="flex items-center gap-2">
                  <input type="radio" name="gender" className="accent-rose"
                  checked ={otherSelected}
                  onChange={(e)=> {setOtherSelected(e.target.checked); setForm((prev) => ({ ...prev, [form.gender]: "" }))} }/>
                {'Other'}
                </label>
            </div>
            {otherSelected &&  (
              <InputField className="input" placeholder="Gender" value={form.gender} name="gender" onChange={handleChange}/>
            )}
          </div>
          <InputField className="input" placeholder="Prefered Contact Method" value={form.contactmethod} name="contactmethod" onChange={handleChange}/>
          <InputField className="input" placeholder="Contact Info" value={form.contactinfo} name="contactinfo" onChange={handleChange}/>
          <p className="text-xs text-zinc-500">
            By clicking Sign Up, you agree to our <span className="text-rose">Terms</span>,
            <span className="text-rose"> Privacy Policy</span>, and <span className="text-rose">Cookies Policy</span>.
          </p>
          <button
            type="submit"
            className="w-full rounded-2xl border border-rose/60 bg-rose/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose/30"
          >
            Sign up
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-zinc-500">
          Already have an account?{' '}
          <Link to="/signin" className="text-rose">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
