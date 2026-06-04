import React from 'react'

export const Input = ({
  label, // Text above the input (optional)
  placeholder = '', // Hint text inside the input
  value, // Current value (controlled from parent)
  onChange, // Function called when user types
  type = 'text', // Input type: 'text', 'email', 'password', etc.
  error = '', // Error message (shows red border + text)
  disabled = false, // If true, input is greyed out and not editable
}) => {
  // Determine border colour based on state
  let borderStyle = ''
  if (disabled) {
    borderStyle = 'border border-border'
  } else if (error) {
    borderStyle = 'border border-error'
  } else {
    borderStyle =
      'border border-border hover:border-primary-light focus:border-primary focus:shadow-input-focus'
  }

  // Background colour
  const backgroundStyle = disabled ? 'bg-disabled' : 'bg-white'

  // Cursor style
  const cursorStyle = disabled ? 'cursor-not-allowed' : 'cursor-text'

  // Combine all classes
  const inputClassName = [
    'w-full rounded-lg px-3.5 py-3',
    'font-sans text-sm text-text-primary',
    'outline-none transition-all duration-200',
    backgroundStyle,
    cursorStyle,
    borderStyle,
  ].join(' ')

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-text-primary">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClassName}
      />
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  )
}
