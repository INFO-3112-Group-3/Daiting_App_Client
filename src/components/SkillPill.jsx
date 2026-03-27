export default function SkillPill({ label, onRemove }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-cyan/60 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-cyan/70 transition hover:text-cyan"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      ) : null}
    </span>
  )
}
