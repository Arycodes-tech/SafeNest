import React, { useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import {
  MdBolt,
  MdLocalParking,
  MdSecurity,
  MdPool,
  MdElectricBolt,
  MdWeekend,
  MdWaterDrop,
  MdFitnessCenter,
} from 'react-icons/md'

export const FilterPanel = ({ onApplyFilters, onBack }) => {
  const [priceRange, setPriceRange] = useState([500000, 5000000])
  const [propertyTypes, setPropertyTypes] = useState([])
  const [bedrooms, setBedrooms] = useState([])
  const [bathrooms, setBathrooms] = useState([])
  const [amenities, setAmenities] = useState([])
  const [furnished, setFurnished] = useState(false)
  const [petsAllowed, setPetsAllowed] = useState(false)

  const toggleChip = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter((item) => item !== value))
    } else {
      setArray([...array, value])
    }
  }

  const handleReset = () => {
    setPriceRange([500000, 5000000])
    setPropertyTypes([])
    setBedrooms([])
    setBathrooms([])
    setAmenities([])
    setFurnished(false)
    setPetsAllowed(false)
  }

  const handleApply = () => {
    const filters = {
      priceRange,
      propertyTypes,
      bedrooms,
      bathrooms,
      amenities,
      furnished,
      petsAllowed,
    }
    if (onApplyFilters) onApplyFilters(filters)
    console.log('Applied filters:', filters)
  }

  const propertyTypeOptions = ['Apartment', 'Duplex', 'Flat', 'Studio', 'Room']
  const bedroomOptions = ['Studio', '1', '2', '3', '4+']
  const bathroomOptions = ['1', '2', '3', '4+']

  const amenitiesOptions = [
    { label: '24/7 Power', icon: MdBolt },
    { label: 'Parking', icon: MdLocalParking },
    { label: 'Security', icon: MdSecurity },
    { label: 'Pool', icon: MdPool },
    { label: 'Generator', icon: MdElectricBolt },
    { label: 'Furnished', icon: MdWeekend },
    { label: 'Water', icon: MdWaterDrop },
    { label: 'Gym', icon: MdFitnessCenter },
  ]

  const formatPrice = (val) => {
    if (val >= 5000000) return '₦5,000,000+'
    return `₦${val.toLocaleString()}`
  }

  function Toggle({ value, onToggle }) {
    return (
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={value}
        className={`relative inline-flex items-center w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          value ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    )
  }

  return (
    <div className="bg-[#F5F5F7] min-h-screen w-full px-4 pt-4 pb-10 flex flex-col">
      <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between mb-4 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 text-text-primary transition-colors"
          aria-label="Go back"
        >
          <FaChevronLeft size={18} />
        </button>
        <h2 className="text-h3 font-bold text-text-primary">Filters</h2>
        <button
          onClick={handleReset}
          className="text-primary text-body  font-semibold text-sm"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <h3 className="text-h3 font-bold text-text-primary mb-4">
            Price Range (per year)
          </h3>
          <input
            type="range"
            min={500000}
            max={5000000}
            step={100000}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3333CC ${
                ((priceRange[1] - 500000) / (5000000 - 500000)) * 100
              }%, #D1D5DB ${
                ((priceRange[1] - 500000) / (5000000 - 500000)) * 100
              }%)`,
            }}
          />
          <div className="flex justify-between mt-3">
            <span className="text-sm font-medium text-text-primary">
              ₦500,000
            </span>
            <span className="text-body font-semibold text-primary">
              {formatPrice(priceRange[1])}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <h3 className="text-h3 font-bold text-text-primary mb-3">
            Property Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {propertyTypeOptions.map((option) => {
              const isSelected = propertyTypes.includes(option)
              return (
                <button
                  key={option}
                  onClick={() =>
                    toggleChip(propertyTypes, setPropertyTypes, option)
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                    isSelected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F4F4F4] text-text-secondary border-transparent'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <h3 className="text-h3 font-bold text-text-primary mb-3">Bedrooms</h3>
          <div className="flex flex-wrap gap-2">
            {bedroomOptions.map((option) => {
              const isSelected = bedrooms.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => toggleChip(bedrooms, setBedrooms, option)}
                  className={`px-4 py-2 rounded-xl text-body font-semibold border-2 transition-colors ${
                    isSelected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F4F4F4] text-text-secondary border-transparent'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <h3 className="text-h3 font-bold text-text-primary mb-3">
            Bathrooms
          </h3>
          <div className="flex flex-wrap gap-2">
            {bathroomOptions.map((option) => {
              const isSelected = bathrooms.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => toggleChip(bathrooms, setBathrooms, option)}
                  className={`px-4 py-2 rounded-xl text-body font-semibold border-2 transition-colors ${
                    isSelected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-[#F4F4F4] text-text-secondary border-transparent'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h3 font-bold text-text-primary">Amenities</h3>
            <button
              onClick={() =>
                setAmenities(
                  amenities.length === amenitiesOptions.length
                    ? []
                    : amenitiesOptions.map((a) => a.label)
                )
              }
              className="text-primary text-body font-semibold"
            >
              Select all
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {amenitiesOptions.map(({ label, icon: Icon }) => {
              const isSelected = amenities.includes(label)
              return (
                <button
                  key={label}
                  onClick={() => toggleChip(amenities, setAmenities, label)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-4 px-2 border-2 transition-colors aspect-square ${
                    isSelected
                      ? 'border-primary bg-[#EEEEFF] text-primary'
                      : 'border-transparent bg-[#F4F4F4] text-text-secondary'
                  }`}
                >
                  <Icon
                    size={28}
                    className="shrink-0 sm:w-8 sm:h-8 md:w-9 md:h-9"
                  />
                  <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight">
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-5 shadow-sm">
          <h3 className="text-h3 font-bold text-text-primary mb-2">
            More Options
          </h3>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between py-4">
              <span className="text-body font-medium text-text-primary">
                Furnished
              </span>
              <Toggle
                value={furnished}
                onToggle={() => setFurnished(!furnished)}
              />
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-body font-medium text-text-primary">
                Pets Allowed
              </span>
              <Toggle
                value={petsAllowed}
                onToggle={() => setPetsAllowed(!petsAllowed)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={handleApply}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl text-base hover:bg-primary-dark transition-colors shadow-md"
        >
          Show 123 Results
        </button>
      </div>
    </div>
  )
}
