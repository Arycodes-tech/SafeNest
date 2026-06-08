import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa'

export const PreferencesPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email || ''
  const phone = location.state?.phone || ''

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [locationPref, setLocationPref] = useState('')
  const [propertyTypes, setPropertyTypes] = useState({
    Apartment: false,
    Room: false,
    House: false,
    Studio: false,
    'Shared Room': false,
  })

  const togglePropertyType = (type) => {
    setPropertyTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSave = () => {
    const selectedTypes = Object.keys(propertyTypes).filter(
      (key) => propertyTypes[key]
    )
    const preferences = {
      budget: { min: minPrice, max: maxPrice },
      location: locationPref,
      propertyTypes: selectedTypes,
    }
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    console.log('Preferences saved:', preferences)
    alert('Preferences saved!')
    navigate('/dashboard')
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background-secondary grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-8 md:px-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-2">
            Set your preferences
          </h1>
          <p className="text-base text-text-secondary text-center mb-8">
            Help us personalize results for you
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Budget range
              </label>
              <div className="flex gap-3">
                <Input
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  icon={<FaDollarSign className="text-text-tertiary" />}
                />
                <Input
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  icon={<FaDollarSign className="text-text-tertiary" />}
                />
              </div>
            </div>

            <Input
              label="Preferred location"
              placeholder="Search location"
              value={locationPref}
              onChange={(e) => setLocationPref(e.target.value)}
              icon={<FaMapMarkerAlt className="text-text-tertiary" />}
            />

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Property type
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(propertyTypes).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => togglePropertyType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      propertyTypes[type]
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-text-secondary hover:bg-background-hover'
                    }`}
                  >
                    {type === 'Shared Room' ? 'Shared Room' : type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="secondary" fullWidth onClick={handleSkip}>
                Skip for now
              </Button>
              <Button variant="primary" fullWidth onClick={handleSave}>
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-center items-center bg-primary/5 p-8">
        <img
          src="https://res.cloudinary.com/demo/image/upload/v1312461206/sample.jpg"
          alt="Preferences illustration"
          className="w-full max-w-sm rounded-2xl shadow-lg"
        />
        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Tailor your experience
            <br />
            to find the perfect home.
          </p>
        </div>
      </div>
    </div>
  )
}
