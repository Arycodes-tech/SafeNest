import React, { useState } from 'react'

export const FilterChips = ({
  options = [], // Array of { label, value } – will come from backend
  onFilterChange, // Function to call when selection changes
}) => {
  const [activeFilters, setActiveFilters] = useState([])

  const handleChipClick = (value) => {
    const isActive = activeFilters.includes(value)
    let updatedFilters

    if (isActive) {
      // Remove the value
      updatedFilters = activeFilters.filter((item) => item !== value)
    } else {
      // Add the value
      updatedFilters = [...activeFilters, value]
    }

    setActiveFilters(updatedFilters)

    if (onFilterChange) {
      onFilterChange(updatedFilters)
    }
  }

  const handleClearAll = () => {
    setActiveFilters([])
    if (onFilterChange) onFilterChange([])
  }

  return (
    <div className="w-full font-sans">
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-text-primary">Filters</p>
        {activeFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary underline hover:text-primary-dark"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Chips row */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = activeFilters.includes(option.value)
          const chipClassName = [
            'rounded-full border px-3.5 py-1.5 text-xs font-semibold',
            'cursor-pointer select-none transition-all duration-200',
            'hover:-translate-y-px',
            isActive
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-white text-text-secondary hover:border-primary-light',
          ].join(' ')

          return (
            <button
              key={option.value}
              onClick={() => handleChipClick(option.value)}
              className={chipClassName}
            >
              {option.label}
              {isActive && <span className="ml-1.5 opacity-75">×</span>}
            </button>
          )
        })}
      </div>

      {/* Active count */}
      {activeFilters.length > 0 && (
        <p className="mt-3 text-xs text-text-tertiary">
          {activeFilters.length}
          {activeFilters.length === 1 ? ' filter' : ' filters'} applied
        </p>
      )}
    </div>
  )
}
