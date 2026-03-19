// Swipe-style profile explorer with match overlay state.
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Sparkles, X } from 'lucide-react'
import { Button } from '../components/Button'
import { ProfileCard } from '../components/ProfileCard'

// Hard-coded deck of sample profiles until API wiring is ready.
const profiles = [
  {
    id: 'whyt',
    name: 'Whyt',
    age: 19,
    role: 'Full Stack Dev',
    location: 'San Francisco',
    bio: 'Shipping playful products, coffee in hand. Looking for someone to co-build and co-explore.',
    skills: ['React', 'MongoDB', 'Node', 'UI/UX', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mara',
    name: 'Mara',
    age: 24,
    role: 'Product Engineer',
    location: 'Austin',
    bio: 'Designing delightful onboarding flows. Big on thoughtful comms and weekend hack nights.',
    skills: ['Next.js', 'Figma', 'Swift', 'Postgres'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ravi',
    name: 'Ravi',
    age: 27,
    role: 'ML Engineer',
    location: 'Seattle',
    bio: 'Building models by day, cooking by night. Looking for someone to co-host demo nights.',
    skills: ['Python', 'PyTorch', 'Rust', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
  },
]

// Reuse the shared fade-in wrapper used across other screens.
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export default function ProfilePage() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showMatch, setShowMatch] = useState(false)
  const currentProfile = useMemo(() => profiles[index], [index])

  const handleAdvance = (dir) => {
    setDirection(dir)
    setIndex((prev) => (prev + 1) % profiles.length)
  }

  const handleLike = () => {
    setShowMatch(true)
  }

  return (
    <motion.section
      className="flex min-h-[70vh] items-center justify-center py-12"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="relative flex w-full max-w-[450px] flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <ProfileCard key={currentProfile.id} profile={currentProfile} direction={direction} />
        </AnimatePresence>

        {/* Floating overlay that simulates a celebratory match moment. */}
        <AnimatePresence>
          {showMatch ? (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center rounded-[24px] bg-gradient-to-b from-[#FF5A7A] via-[#8B5CF6] to-[#00D1FF] p-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="space-y-4 text-white">
                <p className="text-2xl font-semibold">It’s a match!</p>
                <p className="text-sm text-white/80">Start with a hi, or keep exploring.</p>
                <button
                  type="button"
                  className="w-full rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white"
                  onClick={() => {
                    setShowMatch(false)
                    handleAdvance(1)
                  }}
                >
                  Keep exploring
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Tinder-style action row for rewind, skip, and like. */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleAdvance(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A2A36] bg-[#1B1B24] text-[#B9BAC6] transition hover:text-white"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleAdvance(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00D1FF] text-black transition hover:bg-[#33DAFF]"
            type="button"
          >
            <Sparkles className="h-5 w-5" />
          </button>
          <button
            onClick={handleLike}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF5A7A] text-white transition hover:bg-[#FF6D8A]"
            type="button"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <Button variant="ghost" className="text-xs" type="button">
          View full profile
        </Button>
      </div>
    </motion.section>
  )
}
