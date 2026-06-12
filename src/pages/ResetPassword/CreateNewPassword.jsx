import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa'

export const CreateNewPassword = () => {
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
    // ---- BACKEND API CALL ----
    try {
      // const response = await fetch('http://localhost:5001/api/v1/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, newPassword }),
      // })
      // const data = await response.json()
      // if (response.ok) {
      //   alert('Password reset successful. Please log in.')
      //   navigate('/login')
      // } else {
      //   setErrors({ apiError: data.message || 'Reset failed' })
      // }

      // Demo fallback
      await new Promise((resolve) => setTimeout(resolve, 800))
      alert('Password reset successful (demo). Please log in.')
      navigate('/login')
    } catch (err) {
      setErrors({ apiError: 'Network error. Try again.' })
    } finally {
      setIsSubmitting(false)
    }
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
    <div className="min-h-screen bg-background-secondary grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-12 bg-primary/5">
        <div className="max-w-md">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-text-primary">
              Safe<span className="text-primary">Nest</span>
            </h2>
          </div>
          <img
            src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781095664/3d-rendering-house-model-removebg-preview_1_f5qisp.jpg"
            alt="Reset password illustration"
            className="w-full rounded-2xl shadow-lg mb-6"
          />
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-text-tertiary hover:text-primary mb-6 md:hidden"
          >
            <FaArrowLeft size={14} />
            <span className="text-sm">Back</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Create New Password
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Your new password must be different from your old password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-border rounded-xl px-4 py-3 text-body text-text-primary focus:outline-none focus:border-primary"
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

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full border border-border rounded-xl px-4 py-3 text-body text-text-primary focus:outline-none focus:border-primary"
              />
              <ul className="mt-3 space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="text-primary/50 w-4 h-4" />
                  <span className="text-text-tertiary text-sm">
                    Don't use easily guessed information like your name,
                    birthday, or common words.
                  </span>
                </li>
              </ul>
              {errors.confirmPassword && (
                <p className="text-xs text-error mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.apiError && (
              <p className="text-sm text-error text-center">
                {errors.apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary text-white font-semibold py-3 rounded-xl transition ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:opacity-90'
              }`}
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
