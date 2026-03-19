import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Lightweight fade animation shared across auth-related screens.
const container = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.3 } },
}

export default function MatchesPage() {
	return (
		<motion.section
			className="flex min-h-[70vh] items-center justify-center py-10"
			variants={container}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<div className="surface-card w-full max-w-md px-6 py-10 text-center">
				<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#00D1FF] text-black">
					<Heart className="h-6 w-6" />
				</div>
				<h1 className="mt-6 text-2xl font-semibold text-white">No matches yet</h1>
				<p className="mt-3 text-sm text-[#A1A1AA]">
					Keep swiping to find someone who codes and communicates like you do.
				</p>
			</div>
		</motion.section>
	)
}
