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
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both fields')
      return
    }
    setError('')
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    const mockUser = {
      name: 'Olamide',
      email,
      role: 'renter',
      avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
    }
    localStorage.setItem('token', 'demo-token-123')
    localStorage.setItem('user', JSON.stringify(mockUser))
    navigate('/homepage')
    setLoading(false)
  }

  const handleGoogleLogin = () => alert('Google login (demo)')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="relative hidden md:flex flex-col justify-between p-8 lg:p-12 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781214739/Rectangle_788_1_k6oxfy.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781215326/LOGO_fsgsib.svg"
                alt=""
              />
            </div>
            <span className="text-white text-xl font-bold">
              Safe<span className="text-primary-light">Nest</span>
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight">
            Find verified properties.
            <br />
            Rent safely.
            <br />
            <span className="text-primary-light">Live confidently.</span>
          </h1>

          <p className="text-white/80 mt-4 text-base">
            Join thousands of people who trust SafeNest for secure and easy
            renting.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center min-h-screen bg-[#2B3AE7] px-8 py-12 md:px-12">
        <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
        <p className="text-white/70 text-sm mb-8">
          Sign in to your SafeNest account
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white/40 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-white/40 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white text-sm pr-10"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-right  -mt-2">
            <button
              onClick={() => navigate('/reset/password')}
              className="text-sm text-white/80 hover:text-white"
              onClick={() => navigate('/forgot/password')}
              className="text-sm text-white font-bold underline"
            >
              Forgot password?
            </button>
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-white text-[#2B3AE7] font-semibold py-3 rounded-xl text-sm transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#2B3AE7] px-3 text-white/60">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full border border-white/30 rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-white/70 mt-1">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/role')}
              className="text-white underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
