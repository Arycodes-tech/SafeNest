import React, { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtubLight } from 'react-icons/pi'
import { RiDashboard3Line } from 'react-icons/ri'
import { LuCalendar, LuChevronDown } from 'react-icons/lu'

const mockListings = [
  {
    id: 1,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
  },
  {
    id: 2,
    title: 'Mini Flat in Yaba',
    location: 'Yaba, Lagos',
    price: '₦1,000,000',
    beds: 1,
    baths: 1,
    size: '60m²',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
  },
  {
    id: 3,
    title: '2 Bedroom Duplex',
    location: 'Ikoyi, Lagos',
    price: '₦3,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80',
  },
  {
    id: 4,
    title: 'Studio Apartment',
    location: 'Victoria Island, Lagos',
    price: '₦850,000',
    beds: 1,
    baths: 1,
    size: '40m²',
    image:
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80',
  },
  {
    id: 5,
    title: '3 Bedroom Duplex',
    location: 'Lekki Phase 1, Lagos',
    price: '₦4,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80',
  },
  {
    id: 6,
    title: '2 Bedroom Flat',
    location: 'Festac, Lagos',
    price: '₦800,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
  },
  {
    id: 7,
    title: '3 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
  },
  {
    id: 8,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,000,000',
    beds: 2,
    baths: 2,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400&q=80',
  },
  {
    id: 9,
    title: '3 Bedroom Apartment',
    location: 'Ikoyi, Lagos',
    price: '₦2,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80',
  },
]

const DURATION_OPTIONS = ['6 Months', '1 Year', '2 Years', '3 Years']

const REFERRAL_OPTIONS = [
  'Social Media',
  'Friend / Family',
  'Google Search',
  'Agent Referral',
  'SafeNest App',
  'Other',
]

function CustomDropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false)

  function handleSelect(option) {
    onChange(option)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between border rounded-xl px-4 py-3 text-body md:text-h3 transition-colors ${
          open ? 'border-primary' : 'border-border'
        } bg-white`}
      >
        <span className={value ? 'text-text-primary' : 'text-text-tertiary'}>
          {value || placeholder}
        </span>
        <LuChevronDown
          size={18}
          className={`text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-card overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 text-body md:text-h3 transition-colors hover:bg-background-hover ${
                value === option
                  ? 'text-primary font-semibold bg-background-hover'
                  : 'text-text-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const RequestToRentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const listing = mockListings.find((item) => item.id === Number(id))

  const [moveInDate, setMoveInDate] = useState('')
  const [duration, setDuration] = useState('')
  const [referral, setReferral] = useState('')
  const [message, setMessage] = useState(
    "Hi, I'm interested in this property and would like to schedule a viewing"
  )

  const isFormValid = moveInDate !== '' && duration !== '' && referral !== ''

  function handleContinue() {
    if (!isFormValid) return
    navigate('/rent-confirmation', {
      state: {
        listingId: listing?.id,
        moveInDate,
        duration,
        referral,
        message,
      },
    })
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-h3 font-bold text-text-primary mb-2">
          Property not found
        </p>
        <p className="text-body text-text-tertiary mb-6">
          This listing may have been removed.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-6 py-3 rounded-xl text-body font-semibold"
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-28">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-border md:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-9 h-9 flex items-center justify-center shrink-0"
          >
            <FaChevronLeft size={18} className="text-text-primary" />
          </button>
          <h1 className="text-h3 font-bold text-text-primary md:text-h1">
            Request to Rent
          </h1>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6 md:px-8 md:pt-7">
        <div className="flex gap-3 pb-5 border-b border-border">
          <div className="w-[100px] h-[90px] md:w-[130px] md:h-[110px] shrink-0 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  'https://placehold.co/100x90/e2e8f0/94a3b8?text=No+Image'
              }}
            />
          </div>

          <div className="flex flex-col justify-between min-w-0">
            <h2 className="text-small font-bold text-text-primary leading-snug md:text-h3">
              {listing.title}
            </h2>
            <p className="text-caption text-text-tertiary md:text-small">
              {listing.location}
            </p>
            <p className="text-small font-bold text-primary md:text-body">
              {listing.price}
              <span className="text-caption font-normal text-text-tertiary ml-1 md:text-small">
                /year
              </span>
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-caption text-text-tertiary md:text-small">
                <IoBedOutline size={13} />
                {listing.beds}
              </span>
              <span className="flex items-center gap-1 text-caption text-text-tertiary md:text-small">
                <PiBathtubLight size={13} />
                {listing.baths}
              </span>
              <span className="flex items-center gap-1 text-caption text-text-tertiary md:text-small">
                <RiDashboard3Line size={13} />
                {listing.size}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-body font-bold text-text-primary mb-4 md:text-h2">
            Request Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
                Move-in date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-3 text-body md:text-h3 text-text-primary bg-white appearance-none focus:outline-none focus:border-primary focus:shadow-input-focus transition-all"
                  placeholder="Select move-in date"
                  min={new Date().toISOString().split('T')[0]}
                />
                <LuCalendar
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
                Rental Duration
              </label>
              <CustomDropdown
                placeholder="Select duration"
                options={DURATION_OPTIONS}
                value={duration}
                onChange={setDuration}
              />
            </div>

            <div>
              <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
                How do you hear about this property?
              </label>
              <CustomDropdown
                placeholder="Select an option"
                options={REFERRAL_OPTIONS}
                value={referral}
                onChange={setReferral}
              />
            </div>

            <div>
              <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
                Add a message to the agent{' '}
                <span className="text-text-tertiary font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-border rounded-xl px-4 py-3 text-body md:text-h3 text-text-primary bg-white resize-none focus:outline-none focus:border-primary focus:shadow-input-focus transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 md:px-8">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl text-body font-bold md:text-h3 transition-all ${
            isFormValid
              ? 'bg-primary text-white active:scale-[0.98]'
              : 'bg-disabled text-text-tertiary cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
