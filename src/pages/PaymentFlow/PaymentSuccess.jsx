import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaCheck, FaLock, FaRegCircle, FaSignOutAlt } from 'react-icons/fa'

const EscrowStep = ({ icon: Icon, label, active, done }) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
        done
          ? 'bg-[#22C55E] border-[#22C55E]'
          : active
          ? 'bg-primary border-primary'
          : 'bg-white border-border'
      }`}
    >
      <Icon size={14} className={done || active ? 'text-white' : 'text-text-tertiary'} />
    </div>
    <span className={`text-[10px] ${done || active ? 'text-text-primary font-medium' : 'text-text-tertiary'}`}>
      {label}
    </span>
  </div>
)

const StepConnector = ({ done }) => (
  <div className={`flex-1 h-0.5 mt-[-16px] ${done ? 'bg-[#22C55E]' : 'bg-border'}`} />
)

export const PaymentSuccessPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const property = state?.property || {
    title: '2 Bedroom Apartment, Lekki',
    holdingDeposit: 1000000,
  }

  const formattedDeposit = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(property.holdingDeposit || 1000000)

  return (
    <div className="min-h-screen bg-white font-sans pb-32 flex flex-col items-center">
      <div className="w-full max-w-md px-4 pt-16 flex flex-col items-center">
    
        <div className="w-24 h-24 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center">
            <FaCheck size={30} className="text-white" />
          </div>
        </div>

        <h1 className="text-h2 font-bold text-text-primary mb-6">Payment Successful!</h1>


        <div className="w-full border border-border rounded-2xl p-5 space-y-4 shadow-sm">

          <div className="flex items-center justify-between">
            <p className="text-body font-bold text-text-primary">Holding Deposit</p>
            <div className="flex items-center gap-1 bg-[#DCFCE7] rounded-full px-3 py-1">
              <FaLock size={10} className="text-[#22C55E]" />
              <span className="text-[11px] font-semibold text-[#22C55E]">Held</span>
              <span className="text-[9px] text-[#22C55E] leading-tight ml-0.5">
                Funds held<br />securely
              </span>
            </div>
          </div>

          
          <div>
            <p className="text-caption text-text-tertiary">Property</p>
            <p className="text-small font-semibold text-text-primary">{property.title}</p>
          </div>

          
          <div>
            <p className="text-caption text-text-tertiary">Amount</p>
            <p className="text-h3 font-bold text-text-primary">{formattedDeposit}</p>
          </div>

          
          <div className="flex items-start gap-0 pt-2">
            <EscrowStep icon={FaCheck} label="Paid" done />
            <StepConnector done />
            <EscrowStep icon={FaLock} label="In Escrow" active />
            <StepConnector done={false} />
            <EscrowStep icon={FaRegCircle} label="Agreement" />
            <StepConnector done={false} />
            <EscrowStep icon={FaSignOutAlt} label="Released" />
          </div>

          
          <button
            type="button"
            className="w-full flex items-center justify-between border border-border rounded-xl px-4 py-3 mt-2"
            onClick={() => navigate('/home')}
          >
            <span className="text-small font-medium text-text-primary">View Transaction</span>
            <span className="text-text-tertiary">›</span>
          </button>
        </div>
      </div>

      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 space-y-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-full py-4 rounded-xl bg-primary text-white text-body font-bold"
        >
          View My Requests
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