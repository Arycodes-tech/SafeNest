import React from 'react'

export const Button = ({
  children, // The text inside the button (e.g., "Sign Up")
  variant = 'primary', // Style: 'primary' (blue), 'secondary' (outline), or 'text' (plain)
  size = 'medium', // Size: 'small', 'medium', or 'large'
  disabled = false, // If true, button is grey and can't be clicked
  loading = false, // If true, button shows "Loading..." instead of children
  onClick, // Function to run when clicked
  className = '', // Extra CSS classes from parent component
}) => {
  // 1. Define styles for each size

  let sizeClasses = ''
  if (size === 'small') {
    sizeClasses = 'px-3 py-1.5 text-sm'
  } else if (size === 'large') {
    sizeClasses = 'px-5 py-3 text-base'
  } else {
    sizeClasses = 'px-4 py-2.5 text-sm'
  }

  // 2. Define styles for each variant (colour scheme)

  let variantClasses = ''
  if (variant === 'secondary') {
    variantClasses =
      'bg-white text-primary border border-primary hover:bg-background-hover'
  } else if (variant === 'text') {
    variantClasses =
      'bg-transparent text-primary border border-transparent hover:bg-background-hover'
  } else {
    variantClasses =
      'bg-primary text-white border border-transparent hover:bg-primary-dark'
  }
  // 3. Combine all classes into one string
  // These styles apply to every button:
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-sans font-semibold transition-all duration-200 ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    'w-full sm:w-auto' // Full width on mobile, auto width on larger screens

  const finalClassName = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`

  // 4. Decide if the button should be disabled
  // Disable if either disabled={true} OR loading={true}
  const isDisabled = disabled || loading

  // 5. Decide what text to show inside the button

  let buttonContent = children
  if (loading) {
    buttonContent = 'Loading...'
  }
  // 6. Render the actual <button> element
  return (
    <button
      onClick={onClick} // Run this function when clicked
      disabled={isDisabled} // Disable if needed
      className={finalClassName} // All our styles combined
    >
      {buttonContent}
    </button>
  )
}
