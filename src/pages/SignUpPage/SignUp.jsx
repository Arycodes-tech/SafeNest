import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

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

  const role = localStorage.getItem('signupRole')

  if (!role) {
    navigate('/role')
    return null
  }

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
    return true
  }

  const handleSignUp = () => {
    const newErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

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

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    navigate('/verify-otp', { state: { phone: phone, email: email } })

    console.log('Signup data:', {
      fullName,
      email,
      phone,
      password,
      agencyName,
      agreeTerms,
      role,
    })
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <h1 className="text-h2 text-text-primary text-center mb-2">
          Create Your Account
        </h1>
        <p className="text-body text-text-secondary text-center mb-8">
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
            placeholder="Confirm your password"
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

          <label className="flex items-start gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I agree to the{' '}
              <button type="button" className="text-primary underline">
                Terms & Conditions
              </button>{' '}
              and{' '}
              <button type="button" className="text-primary underline">
                Privacy Policy
              </button>{' '}
              of SafeNest
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-error">{errors.agreeTerms}</p>
          )}

          <Button variant="primary" fullWidth onClick={handleSignUp}>
            Continue
          </Button>

          <p className="text-center text-sm text-text-tertiary">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
