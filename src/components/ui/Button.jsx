import React from 'react'

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) => {
  let sizeClasses = ''
  if (size === 'small') {
    sizeClasses = 'px-3 py-1.5 text-sm'
  } else if (size === 'large') {
    sizeClasses = 'px-6 py-3 text-base'
  } else {
    sizeClasses = 'px-4 py-2 text-sm'
  }

  let variantClasses = ''
  if (variant === 'secondary') {
    variantClasses =
      'bg-white text-primary border border-primary hover:bg-background-hover'
  } else if (variant === 'text') {
    variantClasses =
      'bg-transparent text-primary border border-transparent hover:bg-background-hover'
  } else {
    variantClasses =
      'bg-primary text-white border border-transparent hover:bg-primary-dark shadow-floating hover:shadow-card-hover'
  }

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-sans font-semibold transition-all duration-200 ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    'w-full sm:w-auto'

  const finalClassName = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`

  const isDisabled = disabled || loading

  let buttonContent = children
  if (loading) {
    buttonContent = 'Loading...'
  }

  return (
    <button onClick={onClick} disabled={isDisabled} className={finalClassName}>
      {buttonContent}
    </button>
  )
}
