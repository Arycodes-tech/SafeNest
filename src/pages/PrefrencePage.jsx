import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export const PreferencesPage = () => {
  const navigate = useNavigate()

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [location, setLocation] = useState('')

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
      location,
      propertyTypes: selectedTypes,
    }
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    alert('Preferences saved!')
    navigate('/dashboard')
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-2">
          Set your preferences
        </h1>
        <p className="text-base text-text-secondary text-center mb-8">
          Help us personalize results for you
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Budget range
            </label>
            <div className="flex gap-3">
              <Input
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <Input
            label="Preferred location"
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
                      : 'bg-background-secondary text-text-secondary hover:bg-background-hover'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
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
  )
}
