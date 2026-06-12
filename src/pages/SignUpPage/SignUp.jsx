import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/ui/Input'
import { HiShieldCheck } from 'react-icons/hi'

const BASE_URL = 'http://localhost:5000/api/v1'

export const SignUpPage = () => {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const role = localStorage.getItem('signupRole')

  useEffect(() => {
    if (!role) {
      navigate('/role')
    }
  }, [role, navigate])

  if (!role) return null

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    setPhone(digitsOnly)
  }

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const isStrongPassword = (value) => {
    if (value.length < 8) return false
    if (!/[A-Z]/.test(value)) return false
    if (!/[a-z]/.test(value)) return false
    if (!/[0-9]/.test(value)) return false
    if (!/[^A-Za-z0-9]/.test(value)) return false
    return true
  }

  const handleSignUp = async () => {
    const newErrors = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Enter a valid email address (e.g. user@email.com)'
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (phone.length < 10) {
      newErrors.phone = 'Enter a valid phone number (at least 10 digits)'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!isStrongPassword(password)) {
      newErrors.password =
        'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (role === 'agent' && !agencyName.trim()) {
      newErrors.agencyName = 'Agency name is required'
    }
    if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsLoading(true)
    setApiError('')

    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          passwordConfirm: confirmPassword,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setApiError(data.message || 'Something went wrong. Please try again.')
        return
      }
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
      if (data.data?.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user))
      }
      navigate('/verify-otp', { state: { phone, email } })
    } catch (error) {
      setApiError('Cannot connect to server. Make sure the backend is running.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-8 bg-background-secondary min-h-screen">
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781215326/LOGO_fsgsib.svg"
            className="text-primary w-9 h-9"
            alt="SafeNest logo"
          />
          <span className="text-text-primary text-xl font-bold">
            Safe<span className="text-primary">Nest</span>
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <img
            src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1780844868/view-3d-house-model_1_pb87ww.jpg"
            alt="3D House"
            className="w-full max-w-sm object-contain"
          />
        </div>

        <div className="h-9" />
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-text-primary mb-1">
            Create Your Account
          </h1>
          <p className="text-sm text-text-secondary mb-8">
            Let's set up your SafeNest account!
          </p>

          <div className="flex flex-col gap-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              label="Phone Number"
              type="tel"
              inputMode="numeric"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              error={errors.phone}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />

            {role === 'agent' && (
              <Input
                label="Agency Name"
                placeholder="Enter your agency name"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                error={errors.agencyName}
              />
            )}

            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 accent-primary"
                />
                <span>
                  I agree to the{' '}
                  <button type="button" className="text-primary underline">
                    Terms & Conditions
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-primary underline">
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-error ml-5">{errors.agreeTerms}</p>
              )}
            </div>

            {apiError && (
              <p className="text-sm text-error text-center">{apiError}</p>
            )}

            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className={`
                w-full py-3 rounded-xl text-base font-semibold transition-all duration-150
                ${
                  isLoading || !agreeTerms
                    ? 'bg-border text-text-tertiary cursor-not-allowed'
                    : 'bg-primary text-white hover:opacity-90'
                }
              `}
            >
              {isLoading ? 'Creating account...' : 'Continue'}
            </button>

            <p className="text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
