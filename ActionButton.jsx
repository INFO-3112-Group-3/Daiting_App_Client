export default function ActionButton({ icon: Icon, label, tone = 'neutral', onClick }) {
  const tones = {
    neutral: 'border-border bg-charcoal text-zinc-300 hover:text-white',
    cyan: 'border-cyan/60 bg-cyan/15 text-cyan shadow-glow',
    rose: 'border-rose/60 bg-rose/15 text-rose shadow-rose',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 w-14 items-center justify-center rounded-full border text-sm transition hover:-translate-y-1 ${
        tones[tone]
      }`}
      aria-label={label}
    >
      <Icon size={20} />
    </button>
  )
}
