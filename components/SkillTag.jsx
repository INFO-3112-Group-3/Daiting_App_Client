import { memo } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

function SkillTagComponent({ label, tone = 'blue', onRemove, draggable = false, dragConstraints }) {
  const toneClass = tone === 'pink' ? 'skill-chip--pink' : 'skill-chip--blue'
  return (
    <motion.span
      // Layout + entrance animation keeps the chip cloud lively.
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      whileHover={{ y: -4, boxShadow: '0 18px 30px rgba(0, 82, 255, 0.25)' }}
      whileTap={{ scale: 0.96 }}
      drag={draggable}
      dragElastic={0.4}
      dragMomentum={false}
      dragConstraints={dragConstraints}
      className={`skill-chip ${toneClass} group inline-flex items-center gap-2`}
    >
      <span className="font-mono-tech text-[0.6rem] tracking-[0.18em]">
        {label}
      </span>
      {onRemove ? (
        <button
          type="button"
          className="rounded-full border border-transparent p-1 text-[#71717A] transition group-hover:border-[#00D1FF]/40 group-hover:text-[#00D1FF]"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </motion.span>
  )
}

// Memo so the chip only re-renders when its own props change.
export const SkillTag = memo(SkillTagComponent)
