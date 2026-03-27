import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Star, X } from 'lucide-react'
import ActionButton from '../components/ActionButton'
import ConnectionModal from '../components/ConnectionModal'
import PremiumModal from '../components/PremiumModal'
import ProfileCard from '../components/ProfileCard'
import { profiles } from '../data/profiles'

const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    rotate: direction > 0 ? 8 : -8,
    scale: 0.95,
  }),
  center: { x: 0, opacity: 1, rotate: 0, scale: 1 },
  exit: (direction) => ({
    x: direction > 0 ? 260 : -260,
    opacity: 0,
    rotate: direction > 0 ? 12 : -12,
    scale: 0.9,
  }),
}

export default function Discover() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [connectionOpen, setConnectionOpen] = useState(false)
  const [premiumOpen, setPremiumOpen] = useState(false)

  const currentProfile = useMemo(
    () => profiles[activeIndex % profiles.length],
    [activeIndex],
  )

  const handleAction = (action) => {
    if (action === 'pass') {
      setDirection(-1)
      setActiveIndex((prev) => prev + 1)
      return
    }

    if (action === 'super') {
      setDirection(1)
      setActiveIndex((prev) => prev + 1)
      return
    }

    if (action === 'connect') {
      setDirection(1)
      setConnectionOpen(true)
      setActiveIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16">
      <div className="mb-8 flex w-full items-center justify-between">
        <div>
          <p className="label">Discovery Feed</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Today’s suggested match</h2>
        </div>
        <button
          type="button"
          onClick={() => setPremiumOpen(true)}
          className="rounded-full border border-rose/60 bg-rose/20 px-5 py-2 text-sm font-semibold text-white shadow-rose transition hover:bg-rose/30"
        >
          LoveTech Pro
        </button>
      </div>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProfile.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.x > 120) handleAction('connect')
              if (info.offset.x < -120) handleAction('pass')
            }}
          >
            <ProfileCard profile={currentProfile} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <ActionButton icon={X} label="Pass" onClick={() => handleAction('pass')} />
        <ActionButton icon={Star} label="Super Like" tone="cyan" onClick={() => handleAction('super')} />
        <ActionButton icon={Heart} label="Connect" tone="rose" onClick={() => handleAction('connect')} />
      </div>

      <ConnectionModal open={connectionOpen} onClose={() => setConnectionOpen(false)} />
      <PremiumModal open={premiumOpen} onClose={() => setPremiumOpen(false)} />
    </div>
  )
}
