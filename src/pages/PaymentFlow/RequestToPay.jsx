import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

export const RequestToPayPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const property = state?.property || {
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    holdingDeposit: 1000000,
  }

  const [moveInDate, setMoveInDate] = useState(state?.moveInDate || '')

  const formattedDeposit = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(property.holdingDeposit || 1000000)

  return (
    <div className="min-h-screen bg-white font-sans pb-32">
      <div className="px-4 pt-12 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center"
          >
            <FaChevronLeft size={18} className="text-text-primary" />
          </button>
          <div>
            <h1 className="text-h3 font-bold text-text-primary">Request to Pay</h1>
            <p className="text-caption text-text-tertiary">You are interested in this property</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        <div className="flex items-center justify-between border border-border rounded-xl px-4 py-3">
          <span className="text-small text-text-tertiary">Move-in date</span>
          <span className="text-small text-text-primary font-medium">
            {moveInDate || '12 July 2026'}
          </span>
        </div>

    
        <div className="bg-[#EEF0FF] rounded-2xl p-5">
          <p className="text-body font-bold text-text-primary mb-1">Holding Deposit</p>
          <p className="text-h2 font-bold text-primary mb-2">{formattedDeposit}</p>
          <p className="text-small text-text-secondary mb-3">
            This amount will be held securely until your request is accepted
          </p>
          <button type="button" className="text-small font-semibold text-primary underline">
            Learn more
          </button>
        </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 space-y-3">
        <button
          type="button"
          onClick={() =>
            navigate('/pay-holding-deposit', {
              state: { property, moveInDate },
            })
          }
          className="w-full py-4 rounded-xl bg-primary text-white text-body font-bold"
        >
          Continue to Pay
        </button>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-full py-4 rounded-xl border border-primary text-primary text-body font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}