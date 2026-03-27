import { Link } from 'react-router-dom'
import {useState} from 'react'
import { InputField } from '../components/InputField'

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
    const [form, setForm] = useState([])
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

    user.Email = form.email;
    user.Password = form.password;
    user.Gender = form.gender;
    user.Firstname = form.firstname;
    user.Lastname = form.lastname;
    
    console.log(user);
    }
    
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16">
      <div className="soft-card w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-white">Sign up</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Build a profile that reflects your professional energy.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              <select className="input">
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              <select className="input">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
              <select className="input">
                {Array.from({ length: 60 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="label mb-2">Gender</p>
            <div className="flex gap-4 text-sm text-zinc-300">
              {['Female', 'Male', 'Other'].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input type="radio" name="gender" className="accent-rose" value={value} onChange={handleChange}/>
                  {value}
                </label>
              ))}
            </div>
          </div>
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
