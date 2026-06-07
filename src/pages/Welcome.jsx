import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

import heroImage from '../assets/images/Image.jpg'

export const WelcomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background-primary flex flex-col items-center justify-center px-md py-xl">
      <div className="max-w-md w-full text-left">
        <img
          src={heroImage}
          alt="Safe renting illustration"
          className="w-full max-w-xs mx-auto mb-xl"
        />

        <h1 className="text-h1 block px-0 text-text-primary mb-sm">
          <span className="text-primary">Rent</span> Safely.
        </h1>
        <h1 className="text-h1 block text-text-primary mb-sm">
          <span className="text-primary">Move</span> with Confidence.
        </h1>

        <p className="text-body text-text-secondary mb-xl">
          Verified listings, trusted agents,
          <p className="text-body text-text-secondary mb-xl">
            and secure payments — all in one place
          </p>
        </p>

        <div className="flex justify-center text-14">
          <Button variant="primary" fullWidth onClick={() => navigate('/role')}>
            Get Started
          </Button>
        </div>

        <p className="mt-md text-small text-text-tertiary">
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
  )
}
