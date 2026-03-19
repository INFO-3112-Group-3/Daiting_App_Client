// Registration page that mirrors the login experience but collects more data.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPinned } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { InputField } from '../components/InputField'
import * as api from "../utils/api";

// Tags used in the match preferences chip list.
const preferenceOptions = [
	'Pair-program chemistry',
	'Deep work retreats',
	'Co-founding energy',
]

// Shared fade animation for page-level transitions.
const container = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.3 } },
}

export default function RegisterPage() {
	const navigate = useNavigate()
	// Local form + preference state for the demo experience.
	const [form, setForm] = useState([])
	const [selectedPrefs, setSelectedPrefs] = useState(new Set(preferenceOptions))

	// Toggle individual preference chips in a Set to simplify lookup.
	const togglePref = (option) => {
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

	// Basic change handler shared across all text inputs.
	const handleChange = ({ target }) => {
		setForm((prev) => ({ ...prev, [target.name]: target.value }))
	}

	// Skip networking calls and forward the user into the app.
	const handleSubmit = async (event) => {
		event.preventDefault()
	let response = await api.users.register(form.username,form.email,form.password)
      //if its correct
      if (response.ok)
      {
       navigate('/');
      }
      else
      {
        //STUB: once desgin has been finalized, lmk so I can add in this invalid message in a way that makes sense
        const errorText = await response.text();
        console.error(`Register failed: ${errorText}`);
      }
	}

	return (
		<motion.section
			className="flex min-h-[70vh] items-center justify-center py-12"
			variants={container}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<div className="surface-card mx-auto w-full max-w-[450px] bg-[#14141B] p-8 sm:p-10">
				<div className="text-center">
					<h1 className="text-2xl font-semibold text-white">Create account</h1>
					<p className="mt-2 text-sm text-[#9B9BA6]">Find your partner in tech.</p>
				</div>

				{/* Vertical form layout built with the shared InputField component. */}
				<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
					{/*<InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Nova Sterling" />
					<InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Nova Sterling" tone="dark" />*/}
					<InputField label="Username" type="usename" name="username" value={form.Username} onChange={handleChange} placeholder="Username" tone="dark" />
					<InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" tone="dark" />
					<InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" tone="dark" />
					{/*<InputField label="Role" name="stack" value={form.stack} onChange={handleChange} placeholder="Full Stack Dev" tone="dark" />
					<InputField label="Timezone" name="timezone" value={form.timezone} onChange={handleChange} placeholder="UTC+1 / Remote-first" icon={MapPinned} tone="dark" />*/}
					{/*<InputField
						label="Bio"
						name="bio"
						multiline
						rows={3}
						value={form.bio}
						onChange={handleChange}
						placeholder="What are you building these days?"
						tone="dark"
					/> */}

					{/* Preference chips mimic filters until backend matchmaking exists. */}
					<div className="rounded-[18px] border border-[#2A2A36] bg-[#1B1B24] p-4">
						<div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#9B9BA6]">
							<span>Match preferences</span>
							<span>{selectedPrefs.size} selected</span>
						</div>
						<div className="mt-4 flex flex-wrap gap-2">
							{preferenceOptions.map((option) => (
								<button
									type="button"
									key={option}
									onClick={() => togglePref(option)}
									className={`rounded-full px-3 py-2 text-[0.6rem] uppercase tracking-[0.2em] transition ${
										selectedPrefs.has(option)
											? 'bg-[#00D1FF] text-black'
											: 'border border-[#2A2A36] text-[#9B9BA6] hover:text-white'
									}`}
								>
									{option}
								</button>
							))}
						</div>
					</div>

					<Button type="submit" variant="gradient" className="w-full py-3">
						Create profile
					</Button>

					<div className="text-center text-sm text-[#9B9BA6]">
						Already verified?{' '}
						<Link to="/" className="text-[#00D1FF] hover:text-white">Sign in</Link>
					</div>
				</form>
			</div>
		</motion.section>
	)
}
