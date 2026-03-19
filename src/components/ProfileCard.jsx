import { motion } from 'framer-motion'
import { SkillTag } from './SkillTag'

export function ProfileCard({ profile, direction = 1 }) {
	return (
		<motion.div
			// Direction ensures swipes animate in the same direction as the control pressed.
			key={profile.id}
			initial={{ opacity: 0, x: 80 * direction, rotate: 2 * direction }}
			animate={{ opacity: 1, x: 0, rotate: 0 }}
			exit={{ opacity: 0, x: -100 * direction, rotate: -4 * direction }}
			transition={{ duration: 0.35, ease: 'easeOut' }}
			className="surface-card w-full max-w-[450px] overflow-hidden border border-[#262632]"
		>
			<div
				className="profile-media"
				style={{ backgroundImage: `url(${profile.image})` }}
			>
				<div className="absolute inset-0 z-10 flex items-end p-6">
					<div className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur">
						<p className="text-lg font-semibold text-white">
							{profile.name}, {profile.age} - {profile.role}
						</p>
						<p className="text-xs text-white/70">{profile.location}</p>
					</div>
				</div>
			</div>

			<div className="space-y-5 p-6">
				<div>
					<p className="text-xs uppercase tracking-[0.2em] text-[#B9BAC6]">Tech Stack</p>
					<div className="mt-3 flex flex-wrap gap-2">
						{profile.skills.map((skill) => (
							<SkillTag key={skill} label={skill} />
						))}
					</div>
				</div>

				<div>
					<p className="text-xs uppercase tracking-[0.2em] text-[#B9BAC6]">Bio</p>
					<p className="mt-2 text-sm leading-relaxed text-white/80">{profile.bio}</p>
				</div>
			</div>
		</motion.div>
	)
}
