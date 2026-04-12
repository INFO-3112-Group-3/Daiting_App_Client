import { useState } from 'react'

export default function TagInput({
  label,
  values,
  setValues,
  editable,
  toggleEdit
}) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    // prevent duplicates
    if (values.includes(trimmed)) {
      setInput('')
      return
    }

    setValues((prev) => [...prev, trimmed])
    setInput('')
  }

  const removeTag = (index) => {
    setValues((prev) => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

return (
  <div>
    {/* Header (match your other fields) */}
    <div className="flex items-center justify-between mb-2">
      <p className="label">{label}</p>
      <button
        type="button"
        onClick={toggleEdit}
        className="text-sm text-blue-400"
      >
        {editable ? "Lock" : "Edit"}
      </button>
    </div>

    {/* Input (match skills layout) */}
    {editable && (
      <div className="flex flex-col gap-3 sm:flex-row mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add a ${label.toLowerCase()}`}
          className="input"
        />

        <button
          type="button"
          onClick={addTag}
          className="rounded-2xl border border-amber-300/60 bg-amber-300/15 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] transition hover:bg-amber-300/25"
        >
          Add
        </button>
      </div>
    )}

    {/* Tags (match skill pills) */}
    <div className="flex flex-wrap gap-2">
      {values.map((val, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-sm text-white"
        >
          {val}

          {editable && (
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-amber-300 hover:text-red-400"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
)
}