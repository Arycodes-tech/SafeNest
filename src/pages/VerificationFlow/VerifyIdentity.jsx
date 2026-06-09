import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import identificationIcon from '../../assets/icons/IdentificationCard.svg'
import FlowPage from './FlowPage'

const idTypeOptions = [
  { label: 'National ID', value: 'national-id' },
  { label: "Driver's Licence", value: 'drivers-licence' },
  { label: 'International Passport', value: 'passport' },
  { label: "Voter's Card", value: 'voters-card' },
]

function FileUploadField({ label, value, onChange, error }) {
  const ref = useRef(null)

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-semibold text-text-primary">
        {label}
      </label>
      <div
        className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
          error ? 'border-error' : 'border-border hover:border-primary'
        }`}
        onClick={() => ref.current?.click()}
      >
        <span
          className={`text-sm ${value ? 'text-text-primary' : 'text-text-tertiary'}`}
        >
          {value ? value.name : 'Tap to upload'}
        </span>
        {value ? (
          <button
            type="button"
            className="text-sm font-semibold text-error hover:underline"
            onClick={(e) => {
              e.stopPropagation()
              onChange(null)
            }}
          >
            Remove
          </button>
        ) : (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 16V8m0 0l-4 4m4-4l4 4"
              stroke="#2B4CDC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              stroke="#2B4CDC"
              strokeWidth="2"
            />
          </svg>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
      <input
        ref={ref}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => onChange(e.target.files[0] || null)}
      />
    </div>
  )
}

export default function VerifyIdentity() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    idType: '',
    idNumber: '',
    idFront: null,
    idBack: null,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.idType) e.idType = 'Please select an ID type'
    if (!form.idNumber) e.idNumber = 'ID number is required'
    if (!form.idFront) e.idFront = 'Please upload the front of your ID'
    if (!form.idBack) e.idBack = 'Please upload the back of your ID'
    return e
  }

  const handleContinue = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    navigate('/verification/review-info')
  }

  return (
    <FlowPage>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-text-secondary transition-colors hover:text-primary"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-blue-50/70 p-4">
        <img
          src={identificationIcon}
          alt="Identification icon"
          className="mt-0.5 h-10 w-10 shrink-0"
        />
        <div>
          <h1 className="text-h2 font-bold text-text-primary">
            Verify Your Identity
          </h1>
          <p className="mt-1 text-small text-primary">
            This helps build trust with renters.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <Select
          label="ID Type"
          placeholder="Select ID type"
          options={idTypeOptions}
          value={form.idType}
          onChange={handleChange('idType')}
          error={errors.idType}
        />

        <Input
          label="ID Number"
          placeholder="Enter your ID number"
          value={form.idNumber}
          onChange={handleChange('idNumber')}
          error={errors.idNumber}
        />

        <FileUploadField
          label="Upload ID (Front)"
          value={form.idFront}
          onChange={(file) => {
            setForm((prev) => ({ ...prev, idFront: file }))
            if (errors.idFront) setErrors((prev) => ({ ...prev, idFront: '' }))
          }}
          error={errors.idFront}
        />

        <FileUploadField
          label="Upload ID (Back)"
          value={form.idBack}
          onChange={(file) => {
            setForm((prev) => ({ ...prev, idBack: file }))
            if (errors.idBack) setErrors((prev) => ({ ...prev, idBack: '' }))
          }}
          error={errors.idBack}
        />
      </div>

      <div className="mt-8">
        <Button
          onClick={handleContinue}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Continue
        </Button>
      </div>
    </FlowPage>
  )
}
