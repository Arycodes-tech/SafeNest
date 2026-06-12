import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', icons: ['💳'] },
  { id: 'bank_transfer', label: 'Bank Transfer', icons: [] },
  { id: 'ussd', label: 'USSD', icons: [] },
  { id: 'wallet', label: 'Wallet', icons: [] },
]

export const PayHoldingDepositPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const property = state?.property || {
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1',
    holdingDeposit: 1000000,
  }

  const [selectedMethod, setSelectedMethod] = useState('')
  const [loading, setLoading] = useState(false)

  const formattedDeposit = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(property.holdingDeposit || 1000000)

  async function handlePay() {
    if (!selectedMethod) return
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      navigate('/payment-success', { state: { property } })
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-32">
      <div className="px-4 pt-12 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
            <FaChevronLeft size={18} className="text-text-primary" />
          </button>
          <div>
            <h1 className="text-h3 font-bold text-text-primary">Pay Holding Deposit</h1>
            <p className="text-caption text-text-tertiary">
              Property: {property.title}, {property.location}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        <div>
          <p className="text-small text-text-tertiary mb-1">Amount</p>
          <p className="text-h1 font-bold text-primary">{formattedDeposit}</p>
        </div>

        
        <div className="border-b border-border" />

    
        <div>
          <p className="text-body font-semibold text-text-primary mb-4">Select Payment method</p>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center justify-between border rounded-xl px-4 py-4 transition-colors ${
                  selectedMethod === method.id
                    ? 'border-primary bg-[#EEF0FF]'
                    : 'border-border bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id ? 'border-primary' : 'border-border'
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-body text-text-primary">{method.label}</span>
                </div>
                {/* Card icons for card option */}
                {method.id === 'card' && (
                  <div className="flex items-center gap-1">
                    <div className="w-9 h-6 bg-[#1A1F71] rounded flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold tracking-tight">VISA</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
                      <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2 opacity-90" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

    
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 space-y-3">
        <button
          type="button"
          onClick={handlePay}
          disabled={!selectedMethod || loading}
          className={`w-full py-4 rounded-xl text-body font-bold transition-all ${
            selectedMethod && !loading
              ? 'bg-primary text-white'
              : 'bg-disabled text-text-tertiary cursor-not-allowed'
          }`}
        >
          {loading ? 'Processing…' : `Pay ${formattedDeposit}`}
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