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
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-white">{label}:</span>

        <button
          type="button"
          onClick={toggleEdit}
          className="text-sm text-blue-400"
        >
          {editable ? "Lock" : "Edit"}
        </button>
      </div>

      {/* Input */}
      {editable && (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Add a ${label.toLowerCase()}`}
            className="flex-1 rounded bg-[#1B1B24] text-white px-3 py-2"
          />

          <button
            type="button"
            onClick={addTag}
            className="text-sm text-blue-400"
          >
            Add
          </button>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {values.map((val, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-[#2A2A36] px-3 py-1 rounded-full text-white text-sm"
          >
            {val}

            {editable && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-red-400"
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