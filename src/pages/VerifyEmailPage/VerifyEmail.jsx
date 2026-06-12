import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { HiOutlineMail } from 'react-icons/hi'

export const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const email =
    location.state?.email ||
    JSON.parse(localStorage.getItem('user') || '{}').email ||
    ''

  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleResend = async () => {
    if (!email) {
      setError('No email address found. Please go back and try again.')
      return
    }

    setIsResending(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('http://localhost:5001/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(
          data.message || 'Verification email resent! Please check your inbox.'
        )
      } else {
        setError(
          data.message || 'Failed to resend email. Please try again later.'
        )
      }
    } catch (err) {
      console.error('Resend error:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineMail className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Check your Email
        </h1>
        <p className="text-base text-text-secondary mb-6">
          We've sent a reset link to
        </p>
        <p className="text-base font-semibold text-text-primary mb-8">
          {email}
        </p>

        {message && <p className="text-sm text-success mb-4">{message}</p>}

        {error && <p className="text-sm text-error mb-4">{error}</p>}

        <div className="mb-6">
          <button
            onClick={handleResend}
            disabled={isResending}
            className={`text-sm text-primary underline hover:no-underline ${
              isResending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isResending
              ? 'Sending...'
              : "Didn't receive the email? Resend email"}
          </button>
        </div>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => navigate('/login')}
        >
          Back to Sign in
        </Button>
      </div>
    </div>
  )
}
