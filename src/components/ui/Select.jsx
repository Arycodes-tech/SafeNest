import React from 'react'

export const Select = ({
  label, // Text above the dropdown
  value, // Currently selected value
  onChange, // Function called when selection changes
  options = [], // Array of { label, value } – will come from backend
  placeholder = 'Select an option', // Default first option text
  error = '', // Error message (shows red border + text)
  disabled = false, // If true, dropdown is greyed out
}) => {
  // Text colour: grey if nothing selected, dark if a value is chosen
  const textColour = value ? 'text-text-primary' : 'text-text-tertiary'

  // Border style: red if error, otherwise normal with hover/focus effects
  let borderStyle = ''
  if (error) {
    borderStyle = 'border border-error'
  } else {
    borderStyle =
      'border border-border hover:border-primary-light focus:border-primary focus:shadow-input-focus'
  }

  // Background and cursor based on disabled state
  const backgroundStyle = disabled
    ? 'bg-disabled cursor-not-allowed'
    : 'bg-white cursor-pointer'

  // Combine all classes
  const selectClassName = [
    'w-full rounded-lg px-3 py-3',
    'font-sans text-sm outline-none',
    'transition-all duration-200',
    'appearance-none',
    textColour,
    backgroundStyle,
    borderStyle,
  ].join(' ')

  return (
    <div className="relative w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-text-primary">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClassName}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  )
}
