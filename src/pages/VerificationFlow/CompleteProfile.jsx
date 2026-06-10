import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { FaCamera } from 'react-icons/fa'
import avatarPlaceholder from '../../assets/icons/User.svg'
import FlowPage from './FlowPage'

const stateOptions = [
  { label: 'Lagos', value: 'lagos' },
  { label: 'Abuja', value: 'abuja' },
  { label: 'Rivers', value: 'rivers' },
  { label: 'Oyo', value: 'oyo' },
  { label: 'Kano', value: 'kano' },
]

const cityOptions = {
  lagos: [
    { label: 'Lekki', value: 'lekki' },
    { label: 'Yaba', value: 'yaba' },
    { label: 'Ikeja', value: 'ikeja' },
    { label: 'Victoria Island', value: 'vi' },
  ],
  abuja: [
    { label: 'Garki', value: 'garki' },
    { label: 'Wuse', value: 'wuse' },
    { label: 'Maitama', value: 'maitama' },
  ],
  rivers: [
    { label: 'Port Harcourt', value: 'ph' },
    { label: 'Obio', value: 'obio' },
  ],
  oyo: [
    { label: 'Ibadan', value: 'ibadan' },
    { label: 'Ogbomoso', value: 'ogbomoso' },
  ],
  kano: [{ label: 'Kano City', value: 'kano-city' }],
}

const occupationOptions = [
  { label: 'Agent', value: 'agent' },
  { label: 'Landlord', value: 'landlord' },
  { label: 'Developer', value: 'developer' },
  { label: 'Self Employed', value: 'self-employed' },
]

const experienceOptions = [
  { label: 'Less than 1 year', value: '0-1' },
  { label: '1-3 years', value: '1-3' },
  { label: '4-7 years', value: '4-7' },
  { label: '8+ years', value: '8+' },
]

export default function CompleteProfile() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    dob: '',
    address: '',
    state: '',
    city: '',
    occupation: '',
    experience: '',
  })
  const [avatar, setAvatar] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatar(url)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.dob) newErrors.dob = 'Date of birth is required'
    if (!form.address) newErrors.address = 'Residential address is required'
    if (!form.state) newErrors.state = 'State is required'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.occupation) newErrors.occupation = 'Occupation is required'
    if (!form.experience) newErrors.experience = 'Experience is required'
    return newErrors
  }

  const handleContinue = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    navigate('/verification/verify-identity')
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

      <div className="mb-6 text-center">
        <h1 className="text-h2 font-bold text-text-primary">
          Let's Complete your Profile
        </h1>
        <p className="mt-1 text-small text-primary">
          Complete your SafeNest account.
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="relative">
          <div
            className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-border bg-grey-200"
            onClick={() => fileInputRef.current?.click()}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={avatarPlaceholder}
                alt="Profile placeholder"
                className="h-12 w-12 opacity-70"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-floating hover:bg-primary-dark"
          >
            <FaCamera size={12} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <div className="grid gap-4">
        <Input
          label="Date of Birth"
          type="date"
          value={form.dob}
          onChange={handleChange('dob')}
          error={errors.dob}
        />

        <Input
          label="Residential Address"
          placeholder="e.g. 12, Freedom way, Lekki Phase 1"
          value={form.address}
          onChange={handleChange('address')}
          error={errors.address}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="State"
            placeholder="State"
            options={stateOptions}
            value={form.state}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, state: e.target.value, city: '' }))
              if (errors.state) setErrors((prev) => ({ ...prev, state: '' }))
            }}
            error={errors.state}
          />
          <Select
            label="City"
            placeholder="City"
            options={form.state ? cityOptions[form.state] || [] : []}
            value={form.city}
            onChange={handleChange('city')}
            error={errors.city}
            disabled={!form.state}
          />
        </div>

        <Select
          label="Occupation/Business type"
          placeholder="Select occupation"
          options={occupationOptions}
          value={form.occupation}
          onChange={handleChange('occupation')}
          error={errors.occupation}
        />

        <Select
          label="Years of Experience"
          placeholder="Select experience"
          options={experienceOptions}
          value={form.experience}
          onChange={handleChange('experience')}
          error={errors.experience}
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
