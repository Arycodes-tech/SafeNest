import React from 'react'

export const Input = ({
  label, 
  placeholder = '', 
  value, 
  onChange, 
  type = 'text', 
  error = '',
  disabled = false, 
}) => {
  let borderStyle = ''
  if (disabled) {
    borderStyle = 'border border-border'
  } else if (error) {
    borderStyle = 'border border-error'
  } else {
    borderStyle =
      'border border-border hover:border-primary-light focus:border-primary focus:shadow-input-focus'
  }
  const backgroundStyle = disabled ? 'bg-disabled' : 'bg-white'
  const cursorStyle = disabled ? 'cursor-not-allowed' : 'cursor-text'
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
