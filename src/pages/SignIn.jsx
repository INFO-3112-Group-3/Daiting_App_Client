import { Link, useNavigate } from 'react-router-dom'
import * as api from "../utils/api"
import { InputField } from '../components/InputField'
import { useState } from 'react'
export default function SignIn(props) {
  // When loggin in fails, this is the error.
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  // Keep form state in sync with both fields.
  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }))
  }

  // Prevent the default form submission and push the user to the profile page.
  const handleSubmit = async (event) => {
    event.preventDefault()

    let response = await api.users.login(form.email, form.password);

    if (response.ok) {
      //retrieve user from the response to then update the logined user
      const user = await response.json();
      props.updateUser(user);
      console.log(user);

      // Store into local data storage so we dont have to relog on refresh.
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);

      //change this to the profile
      navigate('/profile')
    }
    else {
      setError('Login failed. Check email or password.')
    }
  }


  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16">
      <div className="soft-card w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
        <p className="mt-2 text-sm text-zinc-400">Sign in with your email and password.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <InputField
            // Email field includes an icon and consistent dark styling.
            className="input"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <InputField className="input" placeholder="Password" value={form.password} name="password" type="password" onChange={handleChange} />
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <label className="flex items-center gap-2">
              {/*this doesn't do anything currently*/}
              <input type="checkbox" className="accent-cyan" />
              Remember me
            </label>
            <span className="text-rose">Forgot password?</span>
          </div>
          <button
            type="submit"
            className={`w-full rounded-2xl border border-cyan/60 bg-cyan/20 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-cyan/30 ${error ? 'border-red-500 bg-red-500/20 hover:bg-red-500/30' : 'border-cyan/60 bg-cyan/20 hover:bg-cyan/30'}
`}
          >
            Sign in
          </button>
          {error && (
            <p className="mb-4 text-sm text-red-500 font-semibold">
              {error}
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-xs text-zinc-500">
          New here?{' '}
          <Link to="/signup" className="text-cyan">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}
