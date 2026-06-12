import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaBell,
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaStar,
  FaShieldAlt,
  FaComments,
  FaArrowRight,
  FaHome,
  FaBookmark,
  FaEnvelope,
  FaUser,
} from 'react-icons/fa'
import { BottomNavigation } from '../../components/layout/BottomNavigation'

const FALLBACK_IMAGE =
  'https://res.cloudinary.com/demo/image/upload/v1312461206/placeholder.jpg'

const QUICK_LINKS = [
  {
    label: 'Rent Homes',
    icon: <FaHome className="text-xl" />,
    path: '/browse/properties',
    bgColor: 'bg-[#D1DFEF]',
    iconColor: 'text-[#1E3ABA]',
  },
  {
    label: 'Find Rooms',
    icon: <FaBed className="text-xl" />,
    path: '/browse/properties',
    bgColor: 'bg-[#E2CFED]',
    iconColor: 'text-[#8D41BA]',
  },
  {
    label: 'Nearby Places',
    icon: <FaMapMarkerAlt className="text-xl" />,
    path: '/browse/properties',
    bgColor: 'bg-[#CEEBD9]',
    iconColor: 'text-[#16A34A]',
  },
  {
    label: 'Saved Listings',
    icon: <FaBookmark className="text-xl" />,
    path: '/saved',
    bgColor: 'bg-[#EED7DD]',
    iconColor: 'text-[#B24460]',
  },
  {
    label: 'Agents',
    icon: <FaUser className="text-xl" />,
    path: '/agents',
    bgColor: 'bg-[#FCEACB]',
    iconColor: 'text-[#E49307]',
  },
]

const SEARCH_SUGGESTIONS = [
  { label: '2 Bedroom in Lekki', price: '₦2M – ₦3M' },
  { label: 'Mini Flat in Yaba', price: '₦500k – ₦1M' },
  { label: 'Room in Surulere', price: '₦300k – ₦700k' },
  { label: 'Studio in Victoria Island', price: '₦800k – ₦1.5M' },
]

const POPULAR_LOCATIONS = [
  {
    name: 'Lekki',
    count: '1100+',
    imageUrl:
      'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781103505/Frame_289_ggnryf.jpg',
  },
  {
    name: 'Yaba',
    count: '800+',
    imageUrl:
      'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781104309/Frame_290_mfb2ke.jpg',
  },
  {
    name: 'Victoria Island',
    count: '800+',
    imageUrl:
      'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781104559/Frame_291_dlnxor.jpg',
  },
  {
    name: 'Ikeja',
    count: '500+',
    imageUrl:
      'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781104558/Frame_292_sdk1gg.jpg',
  },
]

const TOP_AGENTS = [
  {
    name: 'Alexa Johnson',
    location: 'Lekki Phase 1, Lagos',
    rating: '4.9',
    reviews: 120,
    avatarUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/avatar1.jpg',
  },
  {
    name: 'John Akinwale',
    location: 'Victoria Island, Lagos',
    rating: '4.7',
    reviews: 96,
    avatarUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/avatar2.jpg',
  },
  {
    name: 'Dariel Ibrahim',
    location: 'Ikeja, Lagos',
    rating: '4.6',
    reviews: 76,
    avatarUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/avatar3.jpg',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1. Search',
    desc: 'Find properties that fit your needs',
    icon: <FaSearch className="text-xl" />,
  },
  {
    step: '2. Connect',
    desc: 'Chat with agents or landlords',
    icon: <FaComments className="text-xl" />,
  },
  {
    step: '3. Secure & Rent',
    desc: 'Escrow & move‑in safely',
    icon: <FaShieldAlt className="text-xl" />,
  },
]

const FALLBACK_LISTINGS = [
  {
    id: 1,
    title: '2 Bedroom Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '2,500,000',
    beds: 2,
    baths: 2,
    size: '120m²',
    verified: true,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/apartment1.jpg',
  },
  {
    id: 2,
    title: '3 Bedroom Duplex',
    location: 'Ikeja, Lagos',
    price: '4,200,000',
    beds: 3,
    baths: 3,
    size: '120m²',
    verified: true,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/house1.jpg',
  },
  {
    id: 3,
    title: 'Mini Flat',
    location: 'Surulere, Lagos',
    price: '1,000,000',
    beds: 1,
    baths: 1,
    size: null,
    verified: true,
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/apartment2.jpg',
  },
]

export const HomePage = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: 'Bayo',
    location: 'Lagos, Nigeria',
    avatarUrl:
      'https://res.cloudinary.com/demo/image/upload/v1312461206/user-avatar.jpg',
  })
  const [notificationCount, setNotificationCount] = useState(0)

  const [listings, setListings] = useState([])
  const [listingsError, setListingsError] = useState(false)

  const [savedListings, setSavedListings] = useState([])

  const toggleSave = (id) => {
    setSavedListings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) return
      try {
        const res = await fetch('http://localhost:5001/api/v1/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setUser({
            name: data.user.name || 'Bayo',
            location: data.user.location || 'Lagos, Nigeria',
            avatarUrl:
              data.user.avatarUrl ||
              'https://res.cloudinary.com/demo/image/upload/v1312461206/user-avatar.jpg',
          })
          setNotificationCount(data.user.unreadNotifications || 0)
        }
      } catch (err) {}
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties/all')
        if (!res.ok) throw new Error('HTTP error')
        const data = await res.json()
        if (data.properties && data.properties.length) {
          setListings(data.properties)
        } else {
          setListings(FALLBACK_LISTINGS)
        }
        setListingsError(false)
      } catch (err) {
        console.warn('Using fallback listings because backend is unavailable')
        setListings(FALLBACK_LISTINGS)
        setListingsError(true)
      }
    }
    fetchListings()
  }, [])

  return (
    <div className="min-h-screen bg-background-secondary font-sans pb-16">
      <div className="sticky top-0 z-10 bg-background-primary px-4 pt-4 pb-3 shadow-floating">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button className="flex items-center gap-2 bg-background-hover rounded-full px-4 py-2">
            <FaMapMarkerAlt className="w-5 h-5" />
            <span>{user.location}</span>
            <FaChevronDown className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/notifications')}
              className="relative bg-background-hover rounded-full p-2"
            >
              <FaBell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate('/profile')}>
              <img
                src={user.avatarUrl}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-primary object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="mt-5 mb-4">
          <h1 className="text-h2 text-text-primary font-bold">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-small text-text-tertiary mt-0.5">
            Find and rent your next home with confidence
          </p>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 flex items-center gap-2 bg-background-primary border border-border rounded-xl px-3 py-3 shadow-sm">
            <FaSearch className="w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search location, apartments, houses......"
              className="flex-1 bg-transparent text-small text-text-primary placeholder:text-text-tertiary outline-none"
            />
          </div>
          <button
            className="bg-primary text-white rounded-xl p-3 flex items-center justify-center shadow-sm"
            onClick={() => navigate('/browse')}
          >
            <FaArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-[#ACC5FD] rounded-2xl overflow-hidden mb-5 min-h-[180px] flex items-center">
          <div className="flex-1 p-5">
            <h2 className="text-black font-bold text-xl leading-tight mb-3 md:text-h2">
              Rent safely.
              <br />
              Move with
              <br />
              confidence.
            </h2>
            <div className="flex items-center gap-3">
              {['Verified Properties', 'Secure Payments', 'Trusted Agents'].map(
                (badge) => (
                  <div
                    key={badge}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <div className="bg-white rounded-full p-1.5">
                      <FaShieldAlt className="w-3 h-3 text-blue" />
                    </div>
                    <span className="text-black font-xl text-[9px] text-center leading-tight max-w-[36px]">
                      {badge}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-[140px] h-[180px] flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781095664/3d-rendering-house-model-removebg-preview_1_f5qisp.jpg"
              alt="Hero property"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1E3ABA]" />
            <span className="w-3 h-3 rounded-full bg-white/40" />
            <span className="w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="bg-background-primary rounded-2xl px-4 py-4 mb-6 shadow-card">
          <div className="flex justify-between">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="flex flex-col items-center gap-2 active:opacity-70"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${link.bgColor} flex items-center justify-center`}
                >
                  <div className={link.iconColor}>{link.icon}</div>
                </div>
                <span className="text-[11px] font-medium text-text-secondary text-center">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-h2 text-text-primary font-bold">
              Verified Listings
            </h2>
            <button
              onClick={() => navigate('/browse/properties')}
              className="text-primary text-small font-medium flex items-center gap-0.5"
            >
              see all <FaArrowRight className="w-3 h-3" />
            </button>
          </div>

          {listingsError && (
            <div className="mb-3 text-xs text-warning bg-yellow-50 p-2 rounded">
              ⚠️ Live properties not available – showing sample data.
            </div>
          )}

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {listings.length > 0 ? (
              listings.slice(0, 5).map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => navigate(`/listing/${listing.id}`)}
                  className="flex-shrink-0 w-[200px] snap-start bg-background-primary rounded-2xl overflow-hidden shadow-card cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={listing.imageUrl || FALLBACK_IMAGE}
                      alt={listing.title}
                      className="w-full h-[120px] object-cover"
                    />
                    {listing.verified && (
                      <span className="absolute bottom-2 left-2 bg-success text-white text-[9px] px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(listing.id)
                      }}
                    >
                      {savedListings.includes(listing.id) ? (
                        <FaHeart className="w-4 h-4 text-error" />
                      ) : (
                        <FaRegHeart className="w-4 h-4 text-text-tertiary" />
                      )}
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-small font-semibold text-text-primary truncate">
                      {listing.title}
                    </p>
                    <p className="text-caption text-text-tertiary flex items-center gap-1 mt-0.5 mb-2">
                      <FaMapMarkerAlt className="w-3 h-3" /> {listing.location}
                    </p>
                    <p className="text-primary font-bold text-small mb-2">
                      ₦{listing.price}/year
                    </p>
                    <div className="flex items-center gap-3 text-caption text-text-tertiary">
                      <span className="flex items-center gap-1">
                        <FaBed className="w-3 h-3" /> {listing.beds}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaBath className="w-3 h-3" /> {listing.baths}
                      </span>
                      {listing.size && (
                        <span className="flex items-center gap-1">
                          <FaRulerCombined className="w-3 h-3" /> {listing.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10 text-text-tertiary">
                No properties available at the moment.
              </div>
            )}
          </div>
        </section>

        <div className="bg-[#ACC5FD] border border-border rounded-2xl p-4 flex items-center gap-4 mb-6">
          <FaShieldAlt className="w-10 h-10 text-primary" />
          <div className="flex-1">
            <p className="text-body font-bold text-black md:text-h3">
              Your safety is our priority
            </p>
            <p className="text-caption text-black mt-0.5 md:text-body">
              All payments are secured with escrow until you confirm
            </p>
          </div>
          <button
            onClick={() => navigate('/safety')}
            className="text-small text-black bg-white p-3.5 border-border rounded-xl font-bold whitespace-nowrap flex items-center gap-0.5"
          >
            Learn more <FaArrowRight className="w-3 h-3" />
          </button>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-h2 text-text-primary font-bold">
              Continue Your Search
            </h2>
            <button
              onClick={() => navigate('/browse/properties')}
              className="text-primary text-small font-bold flex items-center gap-0.5"
            >
              see all <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x scrollbar-hide">
            {SEARCH_SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => navigate('/search')}
                className="flex-shrink-0 snap-start bg-background-primary border border-border rounded-xl px-3 py-3 text-left min-w-[130px]"
              >
                <p className="text-small font-bold text-black leading-tight">
                  {s.label}
                </p>
                <p className="text-caption text-black mt-2">{s.price}</p>
                <span className="mt-5 inline-block text-[15px] border border-primary text-primary bg-[#C7D8FE] font-bold rounded-xl px-2 py-0.5">
                  Saved
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h2 text-text-primary font-bold">
              Popular Locations
            </h2>
            <button
              onClick={() => navigate('/map')}
              className="text-primary text-body font-bold flex items-center gap-1"
            >
              View map <FaMapMarkerAlt className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => navigate(`/search?location=${loc.name}`)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute px-2 top-1">
                  <p className="text-white text-small font-bold leading-tight">
                    {loc.name}
                  </p>
                  <p className="text-white/80 text-xs">
                    {loc.count} properties
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h2 text-black font-extrabold">Top Agents</h2>
            <button
              onClick={() => navigate('/agents')}
              className="text-primary text-sm font-semibold flex items-center gap-1"
            >
              see all <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {TOP_AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="bg-background-primary rounded-2xl px-5 py-4 flex items-center gap-4 shadow-lg border-2 border-secondary hover:shadow-xl transition-shadow"
              >
                <img
                  src={agent.avatarUrl || FALLBACK_IMAGE}
                  alt={agent.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-text-primary truncate">
                    {agent.name}
                  </p>
                  <p className="text-sm text-text-tertiary flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt className="w-3.5 h-3.5" /> {agent.location}
                  </p>
                  <p className="text-sm text-text-tertiary flex items-center gap-1 mt-1">
                    <FaStar className="w-4 h-4 text-warning" />
                    <span className="font-semibold">{agent.rating}</span> (
                    {agent.reviews} reviews)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/chat/${agent.name.toLowerCase().replace(/\s/g, '-')}`
                    )
                  }
                  className="text-text-tertiary hover:text-primary transition-colors"
                >
                  <FaComments className="w-10 h-10" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-h2 text-black font-bold mb-4">How Its Works</h2>
          <div className="flex justify-between">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="flex flex-col items-center gap-2 flex-1 px-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#DDECFD] border border-border flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <p className="text-small font-semibold text-text-primary text-center">
                  {step.step}
                </p>
                <p className="text-caption text-text-tertiary text-center leading-tight">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  )
}
