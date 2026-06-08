import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { FcGoogle } from 'react-icons/fc'

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

  const handleGoogleLogin = () => {
    alert('Google login (demo)')
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <h1 className="text-h1 text-text-primary mb-2">Welcome Back</h1>
        <p className="text-body text-text-tertiary mb-8">
          Sign in to your SafeNest account
        </p>

        <div className="flex flex-col gap-5">
          <Input
            label="Email Address"
            type="email"
            value={email}
            placeholder="Enter your email address"
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
            <button className="text-sm text-primary underline">
              Forgot password?
            </button>
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <Button variant="primary" fullWidth onClick={handleLogin}>
            Log In
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background-primary px-2 text-text-tertiary">
                or
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full border border-border rounded-lg px-4 py-3 text-sm font-medium text-text-primary hover:bg-background-hover transition-colors"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-text-tertiary mt-2">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/role')}
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
