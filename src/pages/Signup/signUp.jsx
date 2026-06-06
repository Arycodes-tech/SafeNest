import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem('signupRole')
  if (!role) {
    navigate('/role')
    return null
  }
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [errors, setErrors] = useState({})
  const handleSignUp = () => {
    const newErrors = {}

    if (!fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!phone.trim()) newErrors.phone = 'Phone number is required'
    if (!password) newErrors.password = 'Password is required'
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'
    if (role === 'agent' && !agencyName.trim())
      newErrors.agencyName = 'Agency name is required for agents'
    if (!agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TEMPORARY: backend not ready yet
console.log('Signup data:', { fullName, email, phone, password, agencyName, agreeTerms, role })
alert('Signup successful! (demo)')
navigate('/') 

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-md py-xl">
      <div className="max-w-md w-full">
        <h1 className="text-h2 text-text-primary text-center mb-xs">
          Create Your Account
        </h1>
        <p className="text-body text-text-secondary text-center mb-md">
          Let set up your SafeNest account
        </p>

        <div className="flex flex-col gap-md">
          <Input
            label="Full name"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
          />

          <Input
            label="Email address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            label="Phone number"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
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
              label="Agency name"
              placeholder="Enter your agency name"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              error={errors.agencyName}
            />
          )}

          <label className="flex items-start gap-sm text-small text-text-secondary">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I agree to the{' '}
              <button className="text-primary underline" type="button">
                Terms & Conditions
              </button>{' '}
              and{' '}
              <button className="text-primary underline" type="button">
                Privacy Policy
              </button>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-xs text-error">{errors.agreeTerms}</p>
          )}

          <Button variant="primary" fullWidth onClick={handleSignUp}>
            Create Account
          </Button>

          <p className="text-center text-small text-text-tertiary">
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
