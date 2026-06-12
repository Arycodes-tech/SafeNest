import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft, FaRegHeart, FaHeart, FaStar } from 'react-icons/fa'
import { IoBedOutline, IoLocationOutline } from 'react-icons/io5'
import { PiBathtubLight } from 'react-icons/pi'
import { RiDashboard3Line } from 'react-icons/ri'
import { LuShare2 } from 'react-icons/lu'
import { MdVerified } from 'react-icons/md'

const mockListings = [
  {
    id: 1,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    type: 'Apartment',
    description:
      'Spacious and well maintained 2 bedroom apartment in a serene environment. The apartment features a modern kitchen, large living room, and ample storage space. Located in the heart of Lekki Phase 1, with easy access to major roads, shopping malls, and recreational facilities.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    agent: {
      name: 'Alexa Johnson',
      avatar:
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781278848/Ellipse_27_vlibqh.jpg',
      rating: 4.8,
      reviews: 126,
      verified: true,
    },
  },
  {
    id: 2,
    title: 'Mini Flat in Yaba',
    location: 'Yaba, Lagos',
    price: '₦1,000,000',
    beds: 1,
    baths: 1,
    size: '60m²',
    type: 'Apartment',
    description:
      'Cozy mini flat in the vibrant Yaba neighbourhood. Perfect for young professionals. Close to tech hubs, universities, and great eateries.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    ],
    agent: {
      name: 'Tunde Bello',
      avatar:
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781278848/Ellipse_31_khysyg.jpg',
      rating: 4.5,
      reviews: 89,
      verified: true,
    },
  },
  {
    id: 3,
    title: '2 Bedroom Duplex',
    location: 'Ikoyi, Lagos',
    price: '₦3,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    type: 'Duplex',
    description:
      'Elegant 2 bedroom duplex in the prestigious Ikoyi neighbourhood. Features high ceilings, premium finishes, and a private garden.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    ],
    agent: {
      name: 'Chidi Okafor',
      avatar:
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781278848/Ellipse_32_zq48py.png',
      rating: 4.9,
      reviews: 210,
      verified: true,
    },
  },
  {
    id: 4,
    title: 'Studio Apartment',
    location: 'Victoria Island, Lagos',
    price: '₦850,000',
    beds: 1,
    baths: 1,
    size: '40m²',
    type: 'Apartment',
    description:
      'Compact and stylish studio apartment on Victoria Island. Perfect for singles or couples. Fully furnished with modern appliances.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    ],
    agent: {
      name: 'Ngozi Eze',
      avatar: 'https://i.pravatar.cc/150?img=25',
      rating: 4.6,
      reviews: 54,
      verified: false,
    },
  },
  {
    id: 5,
    title: '3 Bedroom Duplex',
    location: 'Lekki Phase 1, Lagos',
    price: '₦4,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    type: 'Duplex',
    description:
      "Luxury 3 bedroom duplex with breathtaking views. Comes with a private pool, gym, and 24/7 security. One of Lekki's most sought-after addresses.",
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    ],
    agent: {
      name: 'Emeka Nwosu',
      avatar: 'https://i.pravatar.cc/150?img=60',
      rating: 4.7,
      reviews: 178,
      verified: true,
    },
  },
  {
    id: 6,
    title: '2 Bedroom Flat',
    location: 'Festac, Lagos',
    price: '₦800,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    type: 'House',
    description:
      'Affordable 2 bedroom flat in Festac Town. Well maintained with good road access. Suitable for small families.',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    ],
    agent: {
      name: 'Funmi Adeyemi',
      avatar: 'https://i.pravatar.cc/150?img=44',
      rating: 4.3,
      reviews: 37,
      verified: false,
    },
  },
  {
    id: 7,
    title: '3 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    type: 'Apartment',
    description:
      'Spacious 3 bedroom apartment in a gated estate. Features a large balcony, modern kitchen, and dedicated parking.',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    ],
    agent: {
      name: 'Kemi Adesanya',
      avatar: 'https://i.pravatar.cc/150?img=55',
      rating: 4.8,
      reviews: 92,
      verified: true,
    },
  },
  {
    id: 8,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,000,000',
    beds: 2,
    baths: 2,
    size: '200m²',
    type: 'Apartment',
    description:
      'Well-lit 2 bedroom apartment with sea views. Modern finishes throughout. Walking distance to the beach.',
    images: [
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80',
    ],
    agent: {
      name: 'Seun Olatunji',
      avatar: 'https://i.pravatar.cc/150?img=18',
      rating: 4.4,
      reviews: 63,
      verified: true,
    },
  },
  {
    id: 9,
    title: '3 Bedroom Apartment',
    location: 'Ikoyi, Lagos',
    price: '₦2,500,000',
    beds: 3,
    baths: 3,
    size: '200m²',
    type: 'Apartment',
    description:
      'Tastefully finished 3 bedroom apartment in Ikoyi. Comes with a backup generator, water treatment system, and ample parking.',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    agent: {
      name: 'Bisi Ogunleye',
      avatar: 'https://i.pravatar.cc/150?img=30',
      rating: 4.9,
      reviews: 145,
      verified: true,
    },
  },
]

export const PropertyDetailsPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const listing = mockListings.find((item) => item.id === Number(id))

  const [saved, setSaved] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-h3 font-bold text-text-primary mb-2">
          Property not found
        </p>
        <p className="text-body text-text-tertiary mb-6">
          This listing may have been removed or the link is invalid.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-6 py-3 rounded-xl text-body font-semibold"
        >
          Go back
        </button>
      </div>
    )
  }

  const SHORT_LIMIT = 120
  const isLong = listing.description.length > SHORT_LIMIT
  const displayedDescription =
    showFullDescription || !isLong
      ? listing.description
      : listing.description.slice(0, SHORT_LIMIT) + '...'

  return (
    <div className="min-h-screen bg-white font-sans pb-28">
      <div className="relative w-full h-[260px] md:h-[380px] bg-gray-100">
        <img
          src={listing.images[activeImage]}
          alt={listing.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              'https://placehold.co/800x400/e2e8f0/94a3b8?text=No+Image'
          }}
        />

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-success text-white text-caption font-semibold px-3 py-1.5 rounded-full">
          <MdVerified size={14} />
          Verified Property
        </div>

        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-caption px-2.5 py-1 rounded-full">
          {activeImage + 1}/{listing.images.length}
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-12 left-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-floating"
        >
          <FaChevronLeft size={16} className="text-text-primary" />
        </button>

        <div className="absolute top-12 right-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSaved((prev) => !prev)}
            aria-label={saved ? 'Remove from saved' : 'Save listing'}
            className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-floating"
          >
            {saved ? (
              <FaHeart className="w-5 h-5 text-error" />
            ) : (
              <FaRegHeart className="w-5 h-5 text-text-primary" />
            )}
          </button>
          <button
            type="button"
            aria-label="Share listing"
            className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-floating"
          >
            <LuShare2 size={18} className="text-text-primary" />
          </button>
        </div>
      </div>

      {listing.images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {listing.images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`rounded-full transition-all ${
                index === activeImage
                  ? 'w-4 h-2 bg-primary'
                  : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      <div className="px-4 pt-4 md:px-8 md:pt-6">
        <h1 className="text-h2 font-bold text-text-primary md:text-h1">
          {listing.title}
        </h1>
        <div className="flex items-center gap-1 mt-1">
          <IoLocationOutline
            size={14}
            className="text-text-tertiary shrink-0"
          />
          <p className="text-small text-text-tertiary md:text-body">
            {listing.location}
          </p>
        </div>

        <p className="text-h2 font-bold text-primary mt-3 md:text-h1">
          {listing.price}
          <span className="text-small font-normal text-text-tertiary ml-1 md:text-body">
            /year
          </span>
        </p>

        <div className="flex items-center justify-between border border-border rounded-2xl px-4 py-3 mt-4 md:mt-5">
          <div className="flex flex-col items-center gap-1">
            <IoBedOutline size={20} className="text-text-secondary" />
            <span className="text-small text-text-secondary font-medium md:text-body">
              {listing.beds} Bed{listing.beds > 1 ? 's' : ''}
            </span>
          </div>

          <div className="w-px h-8 bg-border" />

          <div className="flex flex-col items-center gap-1">
            <PiBathtubLight size={20} className="text-text-secondary" />
            <span className="text-small text-text-secondary font-medium md:text-body">
              {listing.baths} Bath{listing.baths > 1 ? 's' : ''}
            </span>
          </div>

          <div className="w-px h-8 bg-border" />

          <div className="flex flex-col items-center gap-1">
            <RiDashboard3Line size={20} className="text-text-secondary" />
            <span className="text-small text-text-secondary font-medium md:text-body">
              {listing.size}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-body font-bold text-text-primary mb-2 md:text-h3">
            Description
          </h2>
          <p className="text-small text-text-tertiary leading-relaxed md:text-body">
            {displayedDescription}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="text-primary text-small font-semibold mt-1 md:text-body"
            >
              {showFullDescription ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        <div className="mt-5">
          <h2 className="text-body font-bold text-text-primary mb-3 md:text-h3">
            Agent
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={listing.agent.avatar}
                alt={listing.agent.name}
                className="w-12 h-12 rounded-full object-cover md:w-14 md:h-14"
                onError={(e) => {
                  e.target.src =
                    'https://placehold.co/48x48/e2e8f0/94a3b8?text=AG'
                }}
              />
              <div>
                <p className="text-small font-bold text-text-primary md:text-body">
                  {listing.agent.name}
                </p>
                {listing.agent.verified && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <MdVerified size={12} className="text-success" />
                    <span className="text-caption text-success font-medium md:text-small">
                      Verified Agent
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <FaStar className="w-4 h-4 text-warning" />
              <span className="text-small font-bold text-text-primary md:text-body">
                {listing.agent.rating}
              </span>
              <span className="text-caption text-text-tertiary md:text-small">
                ({listing.agent.reviews})
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-caption text-text-tertiary mt-6 md:text-small">
          Found something suspicious?{' '}
          <button
            onClick={() => navigate('/report-scam')}
            type="button"
            className="text-error font-semibold"
          >
            Report scam
          </button>
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 flex gap-3 md:px-8">
        <button
          type="button"
          onClick={() => navigate('/chat')}
          className="flex-1 border border-primary text-primary rounded-xl py-3 text-body font-semibold md:text-h3 md:py-4"
        >
          Chat
        </button>
        <button
          type="button"
          onClick={() => navigate('/request-to-rent/:id')}
          className="flex-1 bg-primary text-white rounded-xl py-3 text-body font-semibold md:text-h3 md:py-4"
        >
          Request to Rent
        </button>
      </div>
    </div>
  )
}
