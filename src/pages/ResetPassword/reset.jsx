import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa'

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [checks, setChecks] = useState({
    length: false,
    number: false,
    uppercase: false,
    special: false,
  })

  useEffect(() => {
    setChecks({
      length: newPassword.length >= 8,
      number: /\d/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    })
  }, [newPassword])

  const validateForm = () => {
    const newErrors = {}
    if (!newPassword) newErrors.newPassword = 'Password is required'
    else if (
      !checks.length ||
      !checks.number ||
      !checks.uppercase ||
      !checks.special
    ) {
      newErrors.newPassword = 'Password does not meet all requirements'
    }
    if (!confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password'
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 800))
    alert('Password reset successful. Please log in.')
    navigate('/login')
    setIsSubmitting(false)
  }

  const CheckItem = ({ met, label }) => (
    <li className="flex items-center gap-2 text-sm">
      {met ? (
        <FaCheckCircle className="text-success w-4 h-4" />
      ) : (
        <FaTimesCircle className="text-error w-4 h-4" />
      )}
      <span className={met ? 'text-text-secondary' : 'text-text-tertiary'}>
        {label}
      </span>
    </li>
  )

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-text-tertiary hover:text-primary mb-6"
        >
          <FaArrowLeft size={14} /> <span>Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Create New Password
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          Your new password must be different from old password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />
            <ul className="mt-3 space-y-1">
              <CheckItem met={checks.length} label="At least 8 characters" />
              <CheckItem met={checks.number} label="Includes a number" />
              <CheckItem
                met={checks.uppercase}
                label="Includes an uppercase letter"
              />
              <CheckItem
                met={checks.special}
                label="Includes a special character"
              />
            </ul>
            {errors.newPassword && (
              <p className="text-xs text-error mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-error mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary text-white font-semibold py-3 rounded-xl transition ${isSubmitting ? 'opacity-70' : 'hover:opacity-90'}`}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
