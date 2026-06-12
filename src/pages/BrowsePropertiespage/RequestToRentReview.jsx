import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiChevronLeft, FiLock } from 'react-icons/fi'
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

export default function ReviewAndSubmitPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // ── User info from localStorage (set during login/signup) ───────────────
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : {}

  // ── Request details passed from the "Request to Rent" page ──────────────
  // When you navigate here, pass these via: navigate('/review', { state: { ... } })
  const {
    moveInDate = '12 July 2026',
    duration = '1 Year',
    message = "Hi, I'm interested in this property and would like to schedule a viewing",
    property = {
      title: '2 Bedroom Apartment',
      location: 'Lekki Phase 1, Lagos',
      price: 2500000,
      beds: 2,
      baths: 2,
      sqm: 120,
      imageUrl: 'ADD_PROPERTY_IMAGE_URL_HERE',
    },
  } = location.state || {}

  const handleSubmit = () => {
    // TODO: replace with real API call
    // await fetch('/api/v1/requests', { method: 'POST', body: JSON.stringify({...}) })
    navigate('/request-success')
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center px-4 py-4 border-b border-border">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-background-secondary transition-colors"
        >
          <FiChevronLeft className="w-6 h-6 text-text-primary stroke-2" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-text-primary pr-10">
          Review & Submit
        </h1>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {/* ── Property ── */}
        <section>
          <h2 className="text-base font-bold text-text-primary mb-3">
            Property
          </h2>

          <div className="flex gap-4 pb-5 border-b border-border">
            {/* Property image */}
            <div className="w-28 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property details */}
            <div className="flex flex-col justify-center gap-1">
              <h3 className="font-bold text-base text-text-primary leading-tight">
                {property.title}
              </h3>
              <p className="text-xs text-text-tertiary">{property.location}</p>
              <p className="text-primary font-bold text-base">
                ₦{property.price.toLocaleString('en-NG')}
                <span className="text-xs font-normal text-text-tertiary">
                  {' '}
                  /year
                </span>
              </p>

              {/* Bed / Bath / Sqm icons */}
              <div className="flex items-center gap-3 text-xs text-text-tertiary mt-0.5">
                <span className="flex items-center gap-1">
                  <FaBed className="w-3.5 h-3.5" />
                  {property.beds}
                </span>
                <span className="flex items-center gap-1">
                  <FaBath className="w-3.5 h-3.5" />
                  {property.baths}
                </span>
                <span className="flex items-center gap-1">
                  <FaRulerCombined className="w-3.5 h-3.5" />
                  {property.sqm}m²
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Request Details ── */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-text-primary">
            Request Details
          </h2>

          {/* Move-in date */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-text-primary">Move-in-date</span>
            <span className="text-text-tertiary font-medium">{moveInDate}</span>
          </div>

          {/* Rental duration */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-text-primary">
              Rental Duration
            </span>
            <span className="text-text-tertiary font-medium">{duration}</span>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <span className="block text-sm font-medium text-text-primary">
              Message to Agent
            </span>
            <p className="text-sm text-text-tertiary leading-relaxed">
              {message}
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* ── Your Information ── */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-text-primary">
            Your Information
          </h2>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-text-primary">Full Name</span>
            <span className="text-text-tertiary font-medium">
              {user.name || '—'}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-text-primary">Phone Number</span>
            <span className="text-text-tertiary font-medium">
              {user.phone || '—'}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-text-primary">Email Address</span>
            <span className="text-text-tertiary font-medium">
              {user.email || '—'}
            </span>
          </div>
        </section>

        {/* ── Legal disclaimer ── */}
        <p className="text-xs text-text-secondary leading-relaxed pb-2">
          By submitting this request, you agree to our{' '}
          <button className="text-primary font-semibold hover:underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary font-semibold hover:underline">
            Privacy Policy
          </button>
        </p>
      </div>

      {/* ── Submit button ── */}
      <div className="px-5 pt-3 pb-8 bg-white border-t border-border flex flex-col items-center gap-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white text-base font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          Submit Request
        </button>

        <div className="flex items-center gap-1.5 text-xs text-text-tertiary font-medium">
          <FiLock className="w-3.5 h-3.5 stroke-2" />
          <span>Secure & Encrypted</span>
        </div>
      </div>
    </div>
  )
}
