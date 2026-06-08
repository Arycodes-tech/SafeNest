import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbBuildingSkyscraper } from 'react-icons/tb'
import { MdOutlineBedroomParent } from 'react-icons/md'
import { BsHouseDoor } from 'react-icons/bs'
import { Button } from '../../components/ui/Button'

const MIN_PRICES = ['₦50,000', '₦100,000', '₦150,000', '₦200,000', '₦300,000']
const MAX_PRICES = [
  '₦200,000',
  '₦350,000',
  '₦500,000',
  '₦750,000',
  '₦1,000,000+',
]

const ICON_TYPES = [
  { label: 'Apartment', icon: <TbBuildingSkyscraper size={28} color="blue" /> },
  { label: 'Room', icon: <MdOutlineBedroomParent size={28} color="blue" /> },
  { label: 'House', icon: <BsHouseDoor size={28} color="blue" /> },
]
const PILL_TYPES = ['Studio', 'Shared Room']

export const PreferencesPage = () => {
  const navigate = useNavigate()

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [location, setLocation] = useState('')

  const [selectedTypes, setSelectedTypes] = useState({
    Apartment: false,
    Room: false,
    House: false,
    Studio: false,
    'Shared Room': false,
  })

  const toggleType = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const handleSave = () => {
    const chosenTypes = Object.keys(selectedTypes).filter(
      (k) => selectedTypes[k]
    )
    const preferences = {
      budget: { min: minPrice, max: maxPrice },
      location,
      propertyTypes: chosenTypes,
    }
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    navigate('/Success')
  }

  const handleSkip = () => navigate('/Success')

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden md:flex md:w-1/2 relative flex-col">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <h2 className="font-bold text-h1 text-text-primary">
            Safe<span className="text-primary-light">Nest</span>
          </h2>
        </div>

        <img
          src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1780844868/view-3d-house-model_1_pb87ww.jpg"
          alt="Modern property"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:px-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
            Set your preferences
          </h1>
          <p className="text-sm text-text-secondary mb-8">
            Help us personalize results for you
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Budget range
              </label>
              <div className="flex gap-3">
                <select
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Min Price
                  </option>
                  {MIN_PRICES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Max Price
                  </option>
                  {MAX_PRICES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Preferred location
              </label>
              <input
                type="text"
                placeholder="Search location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">
                Property type
              </label>

              <div className="flex gap-3 mb-3">
                {ICON_TYPES.map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleType(label)}
                    className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 text-xs font-semibold transition-colors duration-150 ${
                      selectedTypes[label]
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-white text-text-secondary hover:border-primary/40'
                    }`}
                  >
                    <span
                      className={
                        selectedTypes[label]
                          ? 'text-primary'
                          : 'text-text-secondary'
                      }
                    >
                      {icon}
                    </span>
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                {PILL_TYPES.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleType(label)}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors duration-150 ${
                      selectedTypes[label]
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-white text-text-secondary hover:border-primary/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2">
              <Button variant="primary" fullWidth onClick={handleSave}>
                Save & Continue
              </Button>

              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-text-secondary underline hover:text-text-primary transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
