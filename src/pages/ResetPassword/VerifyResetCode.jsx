import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export const VerifyResetCodePage = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (code.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }
    setError('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    navigate('/reset-password?token=demo-token')
    setLoading(false)

    // ---- BACKEND CODE
    /*
    try {
      const email = localStorage.getItem('resetEmail')
      const res = await fetch('http://localhost:5001/api/v1/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json()
      if (res.ok) {
        navigate(`/reset-password?token=${data.resetToken}`)
      } else {
        setError(data.message || 'Invalid code')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
    */
  }

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
          Verify Code
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          We sent a 6-digit verification code to your email. Enter it below.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full border border-border rounded-xl px-4 py-3 mb-4 text-center text-2xl tracking-widest focus:outline-none focus:border-primary"
          />
          {error && <p className="text-sm text-error mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white font-semibold py-3 rounded-xl transition ${loading ? 'opacity-70' : 'hover:opacity-90'}`}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      </div>
    </div>
  )
}
