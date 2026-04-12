import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Crown, Sparkles } from 'lucide-react'

const tiers = [
  {
    title: 'Likes',
    price: '$9.99',
    details: 'See who already liked you. Daily priority queue boost.',
  },
  {
    title: 'Unlimited Rematch',
    price: '$16.99',
    details: 'Revisit missed connections and rewind swipes for 48 hours.',
  },
  {
    title: 'Anonymous Mode',
    price: '$37.99',
    details: 'Browse invisibly and appear only to your curated picks.',
  },
]

const features = ['Unlimited Swipes', 'See Who Liked You', 'Private Mode', 'Priority Support']

export default function PremiumModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="soft-card w-full max-w-2xl p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="label">LoveTech Pro</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Upgrade your matchbook.</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Premium access built for founders, engineers, and architects.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {tiers.map((tier) => (
                <div key={tier.title} className="rounded-2xl border border-border bg-black/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{tier.title}</p>
                    <Crown size={16} className="text-rose" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-white">{tier.price}</p>
                  <p className="mt-2 text-xs text-zinc-400">{tier.details}</p>
                  <button type="button" className="mt-4 text-xs text-cyan hover:text-cyan/80">
                    Get more information
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-black/70 p-4 md:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-cyan" />
                  {feature}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-rose/60 bg-gradient-to-r from-rose/40 via-rose/10 to-rose/40 bg-[length:200%_200%] px-4 py-3 text-sm font-semibold text-white shadow-rose transition animate-shimmer"
            >
              <Sparkles size={16} />
              One-Click Pay
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
