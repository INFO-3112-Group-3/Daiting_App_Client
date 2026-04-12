import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

export default function ConnectionModal({ open, onClose, match }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!open) return
    setStatus('loading')
    const timer = setTimeout(() => setStatus('success'), 1200)
    return () => clearTimeout(timer)
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-8 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass w-full max-w-md rounded-2xl p-6 text-white"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Connecting with {match?.profile?.firstName}</p>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-black/60 p-4">
              <div className="flex items-center gap-3">
                {status === 'loading' ? (
                  <Loader2 className="animate-spin text-cyan" size={18} />
                ) : (
                  <Check className="text-rose" size={18} />
                )}
                <p className="text-sm font-semibold">
                  {status === 'loading' ? 'Requesting connection...' : 'Connection request sent.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-2xl border border-rose/60 bg-rose/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose/30"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
