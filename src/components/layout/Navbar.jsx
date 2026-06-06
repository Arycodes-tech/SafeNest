import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import logo from '../../assets/logos/logo.svg'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="flex flex-wrap items-center justify-between gap-xs border-b border-border bg-white px-sm py-xs font-sans sm:px-md">
      <Link to="/" className="flex items-center gap-xs">
        <img src={logo} alt="SafeNest Logo" className="h-9 w-auto" />
        <div>
          <strong className="text-text-primary">SafeNest</strong>
          <p className="m-0 text-caption text-text-tertiary">
            Verified rentals
          </p>
        </div>
      </Link>

      <div className="hidden items-center gap-sm text-small text-text-secondary md:flex">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <Link to="/browse" className="hover:text-primary">
          Verified Listings
        </Link>
        <Link to="/how-it-works" className="hover:text-primary">
          How it works
        </Link>
        <Link to="/safety" className="hover:text-primary">
          Safety Center
        </Link>
      </div>

      <div className="flex items-center gap-xs">
        <Button
          variant="secondary"
          size="small"
          onClick={() => navigate('/login')}
        >
          Log in
        </Button>
        <Button size="small" onClick={() => navigate('/role')}>
          Sign up
        </Button>
      </div>
    </nav>
  )
}
