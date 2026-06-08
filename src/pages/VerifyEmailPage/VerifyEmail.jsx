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

  const [resendDisabled, setResendDisabled] = useState(false)
  const [message, setMessage] = useState('')

  const handleResend = () => {
    setResendDisabled(true)
    console.log('Resend verification email to', email)
    setMessage('Verification email resent! Please check your inbox.')
    setTimeout(() => setResendDisabled(false), 30000)
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
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

        <div className="mb-6">
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className={`text-sm text-primary underline hover:no-underline ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Didn't receive the email? Resend email
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
