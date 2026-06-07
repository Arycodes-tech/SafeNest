import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in both fields')
      return
    }
    setError('')
    alert('Login successful (demo)')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background-primary font-san flex items-center justify-center px-md">
      <div className="max-w-md w-full">
        <h1 className="text-h1 text-text-primary mb-sm ">Welcome Back </h1>
        <h3 className="text-body text-text-tertiary mb-xl">
          Sign in to your SafeNest account
        </h3>
        <div className="flex  flex-col gap-md">
          <Input
            label="Email Address "
            type="email"
            value={email}
            placeholder="Enter your email address "
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-right">
            <button className="text-small text-primary underline">
              Forgot password?
            </button>
          </div>
          {error && <p className="text-small text-error">{error}</p>}
          <Button variant="primary" fullWidth onClick={handleLogin}>
            Log In
          </Button>
          <p className="text-center text-small text-text-tertiary">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
