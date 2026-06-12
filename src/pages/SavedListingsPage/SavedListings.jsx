import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNavigation } from '../../components/layout/BottomNavigation'
import {
  fetchSavedListings,
  unsaveProperty,
  clearAllSaved,
} from '../../services/propertyService'

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

function SavedCard({ property, onClick }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 cursor-pointer active:bg-grey-50 transition-colors"
      onClick={() => onClick(property.id)}
    >
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-grey-200">
        {property.image && (
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-text-primary leading-tight">
          {property.title}
        </h3>
        <p className="mt-0.5 text-xs text-text-tertiary">{property.location}</p>
        <p className="mt-1 text-sm font-bold text-primary">
          ₦{Number(property.price).toLocaleString()}
          <span className="font-normal text-text-tertiary"> /year</span>
        </p>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
            </svg>
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            {property.size}m²
          </span>
        </div>
      </div>
    </div>
  )
}

const TYPE_LABEL_MAP = {
  all: 'All',
  apartment: 'Apartments',
  house: 'Houses',
  duplex: 'Duplexes',
  room: 'Rooms',
  flat: 'Flats',
  studio: 'Studios',
}

export default function SavedListings() {
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [clearing, setClearing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    loadSaved()
  }, [])

  const loadSaved = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSavedListings()
      setListings(data.listings || data.data || data || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const countByType = listings.reduce((acc, p) => {
    const key = (p.type || 'apartment').toLowerCase()
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const tabs = [
    { key: 'all', label: `All(${listings.length})` },
    ...Object.entries(countByType).map(([key, count]) => ({
      key,
      label: `${TYPE_LABEL_MAP[key] || key}(${count})`,
    })),
  ]

  const filtered =
    activeTab === 'all'
      ? listings
      : listings.filter(
          (p) => (p.type || 'apartment').toLowerCase() === activeTab
        )

  const handleClearAll = async () => {
    setClearing(true)
    try {
      await clearAllSaved()
      setListings([])
      setActiveTab('all')
    } catch (e) {
      setError(e.message)
    } finally {
      setClearing(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="sticky top-0 z-10 bg-white px-4 pt-4 pb-0 border-b border-border">
        <div className="mb-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-text-secondary"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-base font-bold text-text-primary">
            Saved Listings
          </h1>
        </div>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'border-primary text-primary bg-[#EEF2FF]'
                  : 'border-transparent text-text-secondary hover:bg-grey-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-32 space-y-3">
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              className="mb-3"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <p className="text-sm font-semibold text-text-primary">
              No saved listings
            </p>
            <p className="mt-1 text-xs text-text-tertiary">
              Properties you save will appear here
            </p>
            <button
              onClick={() => navigate('/verified-listings')}
              className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white"
            >
              Browse Listings
            </button>
          </div>
        ) : (
          filtered.map((property) => (
            <SavedCard
              key={property.id}
              property={property}
              onClick={(id) => navigate(`/property/${id}`)}
            />
          ))
        )}
      </div>

      {!loading && listings.length > 0 && (
        <div className="sticky bottom-16 bg-white px-4 pb-3 pt-2 border-t border-border">
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full rounded-xl border border-primary py-3 text-sm font-bold text-primary"
          >
            Clear all Saved
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center">
            <h3 className="mb-2 text-base font-bold text-text-primary">
              Clear all saved?
            </h3>
            <p className="mb-6 text-sm text-text-tertiary">
              This will remove all your saved listings. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-text-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                disabled={clearing}
                className="flex-1 rounded-xl bg-error py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {clearing ? 'Clearing...' : 'Clear all'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}
