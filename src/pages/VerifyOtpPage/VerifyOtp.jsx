import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export const VerifyOtpPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const phoneNumber =
    location.state?.phone || userData.phone || '+234 915 624 9501'
  const email = location.state?.email || userData.email || ''

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(45)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState('')

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

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    setError('')
  }

  const handleResend = () => {
    setTimer(45)
    setCanResend(false)
    setOtp(['', '', '', '', '', ''])
    setError('')

    console.log('Resend OTP to', phoneNumber)
  }

  const handleVerify = () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }
    alert('OTP verified ')

    const role = localStorage.getItem('signupRole')

    if (role === 'renter') {
      navigate('/preferences', { state: { email, phone: phoneNumber } })
    } else {
      navigate('/verification/complete-profile')
    }
  }
  const isOtpComplete = otp.every((digit) => digit !== '')

  const formattedTimer = `00:${timer < 10 ? `0${timer}` : timer}`

  return (
    <div className="min-h-screen bg-background-secondary flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-md  rounded-2xl shadow-xl p-6 md:p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
          Verify Your Phone Number
        </h1>
        <p className="text-sm text-text-secondary mb-1">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm font-semibold text-text-primary mb-6">
          {phoneNumber}
        </p>

        <div className="flex gap-2 justify-center mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-12 h-12 text-center text-xl font-bold bg-grey border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success"
            />
          ))}
        </div>

        <div className="mb-6">
          {!canResend ? (
            <p className="text-sm text-text-tertiary">
              Didn't receive code? Resend ({formattedTimer})
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

        <div className="flex justify-center mb-4">
          <div className="w-26 h-26 bg-blue-50 rounded-full flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1780911961/image_daecxk.jpg"
              alt=""
            />
          </div>
        </div>

        <p className="text-xs text-text-tertiary mb-6">
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
