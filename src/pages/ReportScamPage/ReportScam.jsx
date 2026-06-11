import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaBell } from 'react-icons/fa'
import { IoWarning } from 'react-icons/io5'
import { LuChevronDown } from 'react-icons/lu'

const REPORT_REASONS = [
  'Fake or fraudulent listing',
  'Scam agent or landlord',
  'Wrong property information',
  'Suspicious payment request',
  'Harassment or threats',
  'Other suspicious activity',
]

export const ReportScamPage = () => {
  const navigate = useNavigate()

  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  function handleSubmit() {
    alert('Report submitted. Thank you!')
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-28">
      <div className="px-4 pt-12 pb-4 border-b border-border md:px-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center"
          >
            <FaChevronLeft size={18} className="text-text-primary" />
          </button>
          <h1 className="text-h3 font-bold text-text-primary md:text-h1">
            Report Scam
          </h1>
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center"
          >
            <FaBell
              onClick={() => navigate('/dashboard')}
              size={20}
              className="text-text-primary"
            />
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-24 h-24 rounded-full bg-status-error-light flex items-center justify-center mb-5">
            <IoWarning size={48} className="text-error" />
          </div>
          <h2 className="text-h3 font-bold text-text-primary mb-2 md:text-h2">
            Report a Scam or Suspicious Activity
          </h2>
          <p className="text-small text-text-tertiary max-w-xs md:text-body">
            Help us keep SafeNest safe for everyone. Report any suspicious
            listings, users or activities
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
            What do you want to report?
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full flex items-center justify-between border border-border rounded-xl px-4 py-3 text-body bg-white"
            >
              <span
                className={reason ? 'text-text-primary' : 'text-text-tertiary'}
              >
                {reason || 'Select a reason'}
              </span>
              <LuChevronDown
                size={18}
                className={`text-text-tertiary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-card overflow-hidden">
                {REPORT_REASONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setReason(option)
                      setDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-body text-text-primary hover:bg-background-hover"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
            Tell us more{' '}
            <span className="text-text-tertiary font-normal">(optional)</span>
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={5}
            placeholder="Provide as much details as possible..."
            className="w-full border border-border rounded-xl px-4 py-3 text-body text-text-primary placeholder:text-text-tertiary bg-white resize-none focus:outline-none focus:border-primary transition-all"
          />
        </div>

        <div className="mb-5">
          <label className="block text-small font-medium text-text-primary mb-2 md:text-body">
            Add photos or screenshots{' '}
            <span className="text-text-tertiary font-normal">(optional)</span>
          </label>
          <label className="w-full border border-border rounded-xl py-5 flex items-center justify-center cursor-pointer hover:bg-background-hover transition-colors">
            <span className="text-body font-semibold text-primary">
              Upload Files
            </span>
            <input type="file" accept="image/*" multiple className="hidden" />
          </label>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 md:px-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl text-body font-bold bg-primary text-white md:text-h3"
        >
          Submit Report
        </button>
      </div>
    </div>
  )
}
