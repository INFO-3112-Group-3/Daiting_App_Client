import { memo, useState } from 'react'

function InputFieldComponent({
  label,
  icon: Icon,
  helper,
  multiline = false,
  tone = 'dark',
  className = '',
  onFocus,
  onBlur,
  ...props
}) {
  // Auto-switch between a single-line input and multiline textarea.
  const FieldElement = multiline ? 'textarea' : 'input'
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (event) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event) => {
    setIsFocused(false)
    onBlur?.(event)
  }

  const labelClass = tone === 'dark' ? 'text-[#B9BAC6]' : 'text-[#8A8A97]'
  const helperClass = tone === 'dark' ? 'text-[#8A8A97]' : 'text-[#A1A1AA]'
  const inputClass = tone === 'dark' ? 'text-white placeholder-[#6B7280]' : 'text-[#141414] placeholder-[#A1A1AA]'
  const iconClass = tone === 'dark' ? 'text-[#8BE9FF]' : 'text-[#00D1FF]'
  const iconFocusClass = tone === 'dark' ? 'text-[#FF9AB0]' : 'text-[#FF5A7A]'

  return (
    <label
      className={`flex flex-col gap-2 text-sm font-semibold ${labelClass} ${className}`}
    >
      <span>{label}</span>
      <div
        // Custom glow color reacts to focus state for subtle feedback.
        className="glass-input flex items-center gap-3"
        style={{ '--glow-color': isFocused ? 'var(--accent-pink)' : 'var(--accent-blue)' }}
      >
        {Icon ? (
          <Icon
            className={`h-5 w-5 transition-colors ${isFocused ? iconFocusClass : iconClass}`}
          />
        ) : null}
        <FieldElement
          {...props}
          rows={multiline ? props.rows ?? 3 : undefined}
          className={`w-full flex-1 appearance-none border-0 bg-transparent text-base focus:outline-none focus:ring-0 ${inputClass}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {helper ? (
        <span className={`text-[0.7rem] font-normal tracking-normal ${helperClass}`}>{helper}</span>
      ) : null}
    </label>
  )
}

// Memoization prevents re-renders when parent state changes elsewhere.
export const InputField = memo(InputFieldComponent)
