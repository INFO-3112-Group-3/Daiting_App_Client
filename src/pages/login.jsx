// Login page that demonstrates the auth flow and routes users to their profile after submitting.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockKeyhole, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'
import * as api from "../utils/api"
// Placeholder credentials so the UI feels populated when the page loads.


// Simple fade animation that wraps the entire page.
const container = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.3 } },
}

export default function LoginPage(props) {
	const navigate = useNavigate()
	// Start with the mock credentials to avoid empty inputs.
	const [form, setForm] = useState([])

	// Keep form state in sync with both fields.
	const handleChange = ({ target }) => {
		setForm((prev) => ({ ...prev, [target.name]: target.value }))
	}

	// Prevent the default form submission and push the user to the profile page.
	const handleSubmit = async (event) => {
		event.preventDefault()

		let response = await api.users.login(form.email,form.password);

		if (response.ok)
		{
			//retrieve user from the response to then update the logined user
        	const user = await response.json();
			props.updateUser(user);
			console.log(user);
			//change this to the profile
			navigate('/profile')
		}

	}

	return (
		<motion.section
			// Animate mount/unmount transitions for a smoother feel.
			className="flex min-h-[70vh] items-center justify-center py-12"
			variants={container}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<div className="surface-card mx-auto w-full max-w-[450px] bg-[#14141B] p-8 sm:p-10">
				{/* Hero copy with a soft welcome message. */}
				<div className="flex flex-col items-center gap-3 text-center">
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5A7A] text-white shadow-[0_10px_20px_rgba(255,90,122,0.45)]">
						<span className="text-lg font-semibold"></span>
					</div>
					<h1 className="text-2xl font-semibold text-white">Welcome back!</h1>
					<p className="text-sm text-[#9B9BA6]">Welcome back, we missed you.</p>
				</div>

				{/* Credential form with custom fields and CTA. */}
				<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
					<InputField
						// Email field includes an icon and consistent dark styling.
						label="Email"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						placeholder="you@domain.dev"
						icon={Mail}
						tone="dark"
					/>

					<InputField
						// Password field mirrors the email input for visual continuity.
						label="Password"
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						placeholder="••••••••"
						icon={LockKeyhole}
						tone="dark"
					/>

					{/* Secondary actions for users who forgot access or still need an invite. */}
					<div className="flex items-center justify-between text-sm text-[#9B9BA6]">
						<button type="button" className="text-[#00D1FF] hover:text-white">
							Forgot password?
						</button>
						<Link to="/register" className="text-[#FF5A7A] hover:text-white">
							Need an invite?
						</Link>
					</div>

					{/* Gradient button triggers the mock login flow. */}
					<Button type="submit" variant="gradient" className="w-full py-3">
						Sign in
					</Button>

					{/* Thin divider before the social auth placeholders. */}
					<div className="flex items-center gap-3 text-xs text-[#9B9BA6]">
						<span className="h-px flex-1 bg-[#2A2A36]" />
						or sign in with
						<span className="h-px flex-1 bg-[#2A2A36]" />
					</div>
					{/* Placeholder buttons for future social providers. */}
					<div className="flex items-center justify-center gap-3">
						<button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A36] bg-[#1B1B24] text-white">
							G
						</button>
						<button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A36] bg-[#1B1B24] text-white">
							A
						</button>
						<button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A36] bg-[#1B1B24] text-white">
							f
						</button>
					</div>
				</form>
			</div>
		</motion.section>
	)
}
