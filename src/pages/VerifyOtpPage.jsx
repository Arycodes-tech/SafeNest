import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export const VerifyOtpPage = () => {
  const navigate = useNavigate()

  const [otpCode, setOtpCode] = useState('')

  const [timer, setTimer] = useState(45)
  const [canResend, setCanResend] = useState(false)

  const [error, setError] = useState('')

  const phoneNumber = ''

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleOtpChange = (e) => {
    const value = e.target.value

    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtpCode(value)
      setError('')
    }
  }

  const handleResend = () => {
    setTimer(45)
    setCanResend(false)
    setOtpCode('')
    setError('')
    console.log('Resend OTP to', phoneNumber)
    // API to send a new code here
  }

  const handleVerify = () => {
    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }
    alert('OTP verified')
    navigate('/dashboard')
  }

  const isOtpComplete = otpCode.length === 6

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Verify Your Phone Number
        </h1>
        <p className="text-base text-text-secondary mb-2">
          Enter the 6-digit code sent to
        </p>
        <p className="text-base font-semibold text-text-primary mb-6">
          {phoneNumber}
        </p>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otpCode}
          onChange={handleOtpChange}
          placeholder="123456"
          className="w-full text-center text-2xl tracking-widest font-semibold border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <div className="mt-6 mb-6">
          {!canResend ? (
            <p className="text-sm text-text-tertiary">
              Didn't receive code? Resend in 00:
              {timer < 10 ? `0${timer}` : timer}
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-primary underline hover:no-underline"
            >
              Didn't receive code? Resend
            </button>
          )}
        </div>

        <p className="text-xs text-text-tertiary mb-8">
          We use verification to keep our community safe
        </p>

        {error && <p className="text-sm text-error mb-4">{error}</p>}

        <Button
          variant="primary"
          fullWidth
          disabled={!isOtpComplete}
          onClick={handleVerify}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
