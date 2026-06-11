import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNavigation } from '../../components/layout/BottomNavigation'
import { fetchVerifiedListings, saveProperty, unsaveProperty } from '../../services/propertyService'

function SkeletonCard() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 animate-pulse">
      <div className="h-20 w-24 shrink-0 rounded-lg bg-grey-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-grey-200" />
        <div className="h-3 w-1/2 rounded bg-grey-200" />
        <div className="h-4 w-2/3 rounded bg-grey-200" />
        <div className="flex gap-3">
          <div className="h-3 w-10 rounded bg-grey-200" />
          <div className="h-3 w-10 rounded bg-grey-200" />
          <div className="h-3 w-12 rounded bg-grey-200" />
        </div>
      </div>
    </div>
  )
}


function ListingCard({ property, isSaved, onToggleSave, onClick }) {
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.stopPropagation()
    setSaving(true)
    await onToggleSave(property.id, isSaved)
    setSaving(false)
  }

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 cursor-pointer active:bg-grey-50 transition-colors"
      onClick={() => onClick(property.id)}
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-grey-200">
        {property.image && (
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-text-primary leading-tight">{property.title}</h3>
          <button
            onClick={handleSave}
            disabled={saving}
            className="shrink-0 p-1 text-text-tertiary hover:text-primary transition-colors"
          >
            {isSaved ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2B4CDC">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            )}
          </button>
        </div>

        <p className="mt-0.5 text-xs text-text-tertiary">{property.location}</p>
        <p className="mt-1 text-sm font-bold text-primary">
          ₦{Number(property.price).toLocaleString()}
          <span className="font-normal text-text-tertiary"> /year</span>
        </p>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
            </svg>
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
            {property.size}m²
          </span>
        </div>
      </div>
    </div>
  )
}


const PROPERTY_TYPES = ['Apartment', 'Duplex', 'Flat', 'Studio', 'Room']
const BEDROOM_OPTIONS = ['Studio', '1', '2', '3', '4+']
const BATHROOM_OPTIONS = ['1', '2', '3', '4+']
const AMENITY_OPTIONS = ['24/7 Power', 'Parking', 'Security', 'Pool', 'Generator', 'Furnished', 'Water', 'Gym']

function FilterSheet({ filters, onApply, onClose }) {
  const [local, setLocal] = useState(filters)

  const toggle = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: prev[field] === value ? '' : value }))
  }

  const toggleAmenity = (amenity) => {
    setLocal((prev) => {
      const current = prev.amenities || []
      return {
        ...prev,
        amenities: current.includes(amenity)
          ? current.filter((a) => a !== amenity)
          : [...current, amenity],
      }
    })
  }

  const ChipButton = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-white text-text-secondary hover:border-primary'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full rounded-t-2xl bg-white px-5 pb-8 pt-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <button onClick={onClose}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="text-base font-bold text-text-primary">Filters</h2>
          <button
            onClick={() => setLocal({ type: '', bedrooms: '', bathrooms: '', amenities: [], furnished: false, petsAllowed: false, minPrice: 500000, maxPrice: 5000000 })}
            className="text-sm font-semibold text-primary"
          >
            Reset
          </button>
        </div>

        
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-text-primary">Price Range (per year)</p>
          <input
            type="range"
            min={500000}
            max={5000000}
            step={100000}
            value={local.maxPrice || 5000000}
            onChange={(e) => setLocal((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-text-tertiary">
            <span>₦500,000</span>
            <span>₦{Number(local.maxPrice || 5000000).toLocaleString()}+</span>
          </div>
        </div>

        
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-text-primary">Property Type</p>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((t) => (
              <ChipButton key={t} label={t} active={local.type === t} onClick={() => toggle('type', t)} />
            ))}
          </div>
        </div>

    
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-text-primary">Bedrooms</p>
          <div className="flex flex-wrap gap-2">
            {BEDROOM_OPTIONS.map((b) => (
              <ChipButton key={b} label={b} active={local.bedrooms === b} onClick={() => toggle('bedrooms', b)} />
            ))}
          </div>
        </div>

        
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold text-text-primary">Bathrooms</p>
          <div className="flex flex-wrap gap-2">
            {BATHROOM_OPTIONS.map((b) => (
              <ChipButton key={b} label={b} active={local.bathrooms === b} onClick={() => toggle('bathrooms', b)} />
            ))}
          </div>
        </div>

        
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">Amenities</p>
            <button
              onClick={() => setLocal((p) => ({ ...p, amenities: AMENITY_OPTIONS }))}
              className="text-xs font-semibold text-primary"
            >
              Select all
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {AMENITY_OPTIONS.map((a) => {
              const active = (local.amenities || []).includes(a)
              return (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-xs transition-colors ${
                    active ? 'border-primary bg-[#EEF2FF] text-primary' : 'border-border text-text-secondary'
                  }`}
                >
                  <span className="text-base">
                    {a === '24/7 Power' ? '⚡' : a === 'Parking' ? '🅿️' : a === 'Security' ? '🛡️' : a === 'Pool' ? '🏊' : a === 'Generator' ? '🔌' : a === 'Furnished' ? '🪑' : a === 'Water' ? '💧' : '🏋️'}
                  </span>
                  <span className="leading-tight text-center">{a}</span>
                </button>
              )
            })}
          </div>
        </div>

        
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-text-primary">More Options</p>
          {[
            { label: 'Furnished', field: 'furnished' },
            { label: 'Pets Allowed', field: 'petsAllowed' },
          ].map(({ label, field }) => (
            <div key={field} className="mb-3 flex items-center justify-between">
              <span className="text-sm text-text-secondary">{label}</span>
              <button
                onClick={() => setLocal((p) => ({ ...p, [field]: !p[field] }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  local[field] ? 'bg-primary' : 'bg-grey-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    local[field] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => onApply(local)}
          className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-white"
        >
          Show Results
        </button>
      </div>
    </div>
  )
}


const TABS = ['All', 'Apartments', 'Houses', 'Duplexes']


const DEFAULT_FILTERS = {
  type: '',
  bedrooms: '',
  bathrooms: '',
  amenities: [],
  furnished: false,
  petsAllowed: false,
  minPrice: 500000,
  maxPrice: 5000000,
}

export default function VerifiedListings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab]   = useState('All')
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters]       = useState(DEFAULT_FILTERS)
  const [listings, setListings]     = useState([])
  const [savedIds, setSavedIds]     = useState(new Set())
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [page, setPage]             = useState(1)
  const [hasMore, setHasMore]       = useState(true)

  const TAB_TYPE_MAP = { All: '', Apartments: 'Apartment', Houses: 'House', Duplexes: 'Duplex' }

  const loadListings = useCallback(async (activeFilters, currentPage, replace = false) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchVerifiedListings(activeFilters, currentPage)
      const items = data.properties || data.data || data || []
      setListings((prev) => replace ? items : [...prev, ...items])
      setHasMore(items.length === 20)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const tabFilter = { ...filters, type: TAB_TYPE_MAP[activeTab] || filters.type }
    setPage(1)
    loadListings(tabFilter, 1, true)
  }, [activeTab, filters])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setShowFilter(false)
  }

  const handleToggleSave = async (propertyId, isSaved) => {
    try {
      if (isSaved) {
        await unsaveProperty(propertyId)
        setSavedIds((prev) => { const s = new Set(prev); s.delete(propertyId); return s })
      } else {
        await saveProperty(propertyId)
        setSavedIds((prev) => new Set([...prev, propertyId]))
      }
    } catch {
      // silently fail — show toast in production
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      
      <div className="sticky top-0 z-10 bg-white px-4 pt-4 pb-0 border-b border-border">
        <div className="mb-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1 text-text-secondary">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-text-primary">Verified Listings</h1>
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary"
          >
            Filter
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M6 12h12M10 18h4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-[#EEF2FF] text-primary'
                  : 'text-text-secondary hover:bg-grey-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      
      <div className="px-4 py-3">
        <p className="text-sm font-bold text-text-primary">
          {loading && listings.length === 0 ? '...' : `${listings.length}+ Verified Properties`}
        </p>
        <p className="text-xs text-text-tertiary">All properties have passed SafeNest checks</p>
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3">
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</div>
        )}

        {loading && listings.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : listings.map((property) => (
              <ListingCard
                key={property.id}
                property={property}
                isSaved={savedIds.has(property.id)}
                onToggleSave={handleToggleSave}
                onClick={(id) => navigate(`/property/${id}`)}
              />
            ))}

        {!loading && listings.length === 0 && !error && (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-sm font-semibold text-text-primary">No listings found</p>
            <p className="mt-1 text-xs text-text-tertiary">Try adjusting your filters</p>
          </div>
        )}

        {hasMore && !loading && listings.length > 0 && (
          <button
            onClick={() => {
              const next = page + 1
              setPage(next)
              loadListings({ ...filters, type: TAB_TYPE_MAP[activeTab] || filters.type }, next)
            }}
            className="w-full rounded-xl border border-border py-3 text-sm font-semibold text-primary"
          >
            Load more
          </button>
        )}
      </div>

      {showFilter && (
        <FilterSheet
          filters={filters}
          onApply={handleApplyFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      <BottomNavigation />
    </div>
  )
}
