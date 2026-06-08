import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export const Input = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  error = '',
  disabled = false,
  name = '',
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text-primary outline-none focus:border-primary disabled:bg-disabled pr-10"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
