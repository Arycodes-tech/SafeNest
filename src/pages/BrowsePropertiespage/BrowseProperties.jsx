import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaChevronLeft } from 'react-icons/fa'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtubLight } from 'react-icons/pi'
import { RiDashboard3Line } from 'react-icons/ri'
import { LuSlidersHorizontal } from 'react-icons/lu'
import { BottomNavigation } from '../../components/layout/BottomNavigation'

const CATEGORIES = ['All', 'Apartments', 'Houses', 'Duplexes']

const CATEGORY_TYPE_MAP = {
  All: null,
  Apartments: 'Apartment',
  Houses: 'House',
  Duplexes: 'Duplex',
}

const mockListings = [
  {
    id: 1,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    type: 'Apartment',
  },
  {
    id: 2,
    title: 'Mini Flat in Yaba',
    location: 'Yaba, Lagos',
    price: '₦1,000,000',
    beds: 1,
    baths: 1,
    size: '60m²',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    type: 'Apartment',
  },
  {
    id: 3,
    title: '2 Bedroom Duplex',
    location: 'Ikoyi, Lagos',
    price: '₦3,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80',
    type: 'Duplex',
  },
  {
    id: 4,
    title: 'Studio Apartment',
    location: 'Victoria Island, Lagos',
    price: '₦850,000',
    beds: 1,
    baths: 1,
    size: '40m²',
    image:
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80',
    type: 'Apartment',
  },
  {
    id: 5,
    title: '3 Bedroom Duplex',
    location: 'Lekki Phase 1, Lagos',
    price: '₦4,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80',
    type: 'Duplex',
  },
  {
    id: 6,
    title: '2 Bedroom Flat',
    location: 'Festac, Lagos',
    price: '₦800,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
    type: 'House',
  },
  {
    id: 7,
    title: '3 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    type: 'Apartment',
  },
  {
    id: 8,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,000,000',
    beds: 2,
    baths: 2,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400&q=80',
    type: 'Apartment',
  },
  {
    id: 9,
    title: '3 Bedroom Apartment',
    location: 'Ikoyi, Lagos',
    price: '₦2,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80',
    type: 'Apartment',
  },
]

export const BrowsePropertiesPage = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [savedIds, setSavedIds] = useState([])

  const filteredListings =
    CATEGORY_TYPE_MAP[selectedCategory] === null
      ? mockListings
      : mockListings.filter(
          (listing) => listing.type === CATEGORY_TYPE_MAP[selectedCategory]
        )

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] font-sans pb-32">
      <div className="bg-white px-4 pt-6 pb-4 md:px-8 md:pt-8">
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => navigate('/HomePage')}
            aria-label="Go home"
            className="w-9 h-9 flex items-center justify-center"
          >
            <FaChevronLeft size={18} className="text-text-primary" />
          </button>

          <h1 className="text-h3 font-bold text-text-primary md:text-h1">
            Verified Listings
          </h1>

          <button
            type="button"
            onClick={() => navigate('/filter')}
            className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-1.5 md:px-4 md:py-2 text-small md:text-body font-medium text-text-primary bg-[#E6E6E6]"
          >
            Filter
            <LuSlidersHorizontal size={15} />
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide border-b border-gray-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`pb-2 text-body md:text-h3 font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-tertiary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <p className="text-body font-bold text-text-primary md:text-h2">
            {filteredListings.length} Verified Properties
          </p>
          <p className="text-small text-text-tertiary mt-0.5 md:text-body">
            All properties have passed SafeNest checks
          </p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4 md:px-8 md:pt-6 md:space-y-5">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            onClick={() => navigate(`/listing/${listing.id}`)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer flex shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="w-[140px] md:w-[200px] shrink-0 self-stretch">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://placehold.co/140x160/e2e8f0/94a3b8?text=No+Image'
                }}
              />
            </div>

            <div className="flex-1 px-4 py-4 md:px-6 md:py-5 flex flex-col justify-between min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-small font-bold text-text-primary leading-snug md:text-h3">
                  {listing.title}
                </h3>

                <button
                  type="button"
                  className="shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSave(listing.id)
                  }}
                  aria-label={
                    savedIds.includes(listing.id)
                      ? 'Remove from saved'
                      : 'Save listing'
                  }
                >
                  {savedIds.includes(listing.id) ? (
                    <FaHeart className="w-5 h-5 text-error" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <p className="text-caption text-text-tertiary mt-1 md:text-small">
                {listing.location}
              </p>

              <p className="text-small font-bold text-primary mt-2 md:text-h3">
                {listing.price}
                <span className="text-caption font-normal text-text-tertiary ml-1 md:text-small">
                  /year
                </span>
              </p>

              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-caption text-text-tertiary md:text-small">
                  <IoBedOutline size={14} className="md:w-4 md:h-4" />
                  {listing.beds} bed{listing.beds > 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1 text-caption text-text-tertiary md:text-small">
                  <PiBathtubLight size={14} className="md:w-4 md:h-4" />
                  {listing.baths} bath{listing.baths > 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1 text-caption text-text-tertiary md:text-small">
                  <RiDashboard3Line size={14} className="md:w-4 md:h-4" />
                  {listing.size}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredListings.length === 0 && (
          <div className="text-center py-16 text-text-secondary text-body">
            No properties found in this category.
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
