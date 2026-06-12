import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaBell,
  FaChartLine,
  FaHome,
  FaList,
  FaEnvelope,
  FaPlus,
  FaCalendarAlt,
  FaWallet,
  FaComments,
  FaChevronDown,
  FaBed,
  FaBath,
  FaCar,
} from 'react-icons/fa'
import { HiShieldCheck } from 'react-icons/hi'
import { BottomNavigation } from '../components/layout/BottomNavigation'

function formatNaira(amount) {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function timeAgo(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const MOCK_USER = {
  name: 'Olawale',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  notificationCount: 3,
}

const MOCK_STATS = {
  activeListings: 4,
  newInquiries: 0,
  profileViews: 1,
  totalEarnings: 0,
}

const MOCK_EARNINGS = {
  amount: 0,
  growth: 0,
}

const MOCK_LISTINGS = [
  {
    id: 1,
    title: '2 Bedroom Apartment',
    price: 3500000,
    beds: 2,
    baths: 2,
    hasParking: true,
    imageUrl: 'ADD_LISTING_IMAGE_URL_HERE',
    status: 'Active',
  },
  {
    id: 2,
    title: '1 Bedroom Apartment',
    price: 2500000,
    beds: 1,
    baths: 1,
    hasParking: true,
    imageUrl: 'ADD_LISTING_IMAGE_URL_HERE',
    status: 'Active',
  },
  {
    id: 3,
    title: '2 Bedroom Apartment',
    price: 2500000,
    beds: 2,
    baths: 2,
    hasParking: true,
    imageUrl: 'ADD_LISTING_IMAGE_URL_HERE',
    status: 'Active',
  },
  {
    id: 4,
    title: '2 Bedroom Apartment',
    price: 2500000,
    beds: 2,
    baths: 2,
    hasParking: true,
    imageUrl: 'ADD_LISTING_IMAGE_URL_HERE',
    status: 'Active',
  },
  {
    id: 5,
    title: '2 Bedroom Apartment',
    price: 2500000,
    beds: 2,
    baths: 2,
    hasParking: true,
    imageUrl: 'ADD_LISTING_IMAGE_URL_HERE',
    status: 'Active',
  },
  {
    id: 6,
    title: '2 Bedroom Apartment',
    price: 2500000,
    beds: 2,
    baths: 2,
    hasParking: true,
    imageUrl: 'ADD_LISTING_IMAGE_URL_HERE',
    status: 'Active',
  },
]

const MOCK_INQUIRIES = [
  {
    id: 1,
    tenantName: 'Emeka Johnson',
    tenantAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    propertyTitle: '2 Bedroom Apartment',
    location: 'Lekki, Lagos',
    message: 'Hello, is this apartment still available ...',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: 2,
    tenantName: 'Deborah Unoh',
    tenantAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    propertyTitle: '1 Bedroom Apartment',
    location: 'Ikeja, Lagos',
    message: 'I would like to schedule a viewing.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isOnline: false,
    unreadCount: 0,
  },
]

export const Dashboard = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(MOCK_USER)
  const [stats, setStats] = useState(MOCK_STATS)
  const [earnings, setEarnings] = useState(MOCK_EARNINGS)
  const [listings, setListings] = useState(MOCK_LISTINGS)
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)
      setError('')
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)) // fake delay
        setUser(MOCK_USER)
        setStats(MOCK_STATS)
        setEarnings(MOCK_EARNINGS)
        setListings(MOCK_LISTINGS)
        setInquiries(MOCK_INQUIRIES)
      } catch (err) {
        setError('Failed to load dashboard. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  return (
    <div className="min-h-screen bg-background-secondary pb-24 md:pb-0">
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiShieldCheck className="text-primary w-8 h-8" />
            <span className="text-lg font-bold text-text-primary">
              Safe<span className="text-primary">Nest</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/notifications')}
              className="relative"
            >
              <FaBell className="w-5 h-5 text-text-secondary" />
              {user.notificationCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-error text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {user.notificationCount}
                </span>
              )}
            </button>
            <img
              src={user.avatarUrl}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-primary"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-error/10 text-error text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <h1 className="text-h2 font-bold text-text-primary mb-5">
          Hello {user.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-[#B4FFCF] flex gap-4 rounded-2xl p-4">
            <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center flex-shrink-0">
              <HiShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-h2 font-bold text-[#16A34A] mb-1">
                Verified Landlord
              </h3>
              <p className="text-sm md:text-h3 text-text-secondary leading-snug">
                Your profile is verified. Thank you for being a trusted part of
                SafeNest.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-full min-h-[140px] md:min-h-[130px]">
            <img
              src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781095664/3d-rendering-house-model-removebg-preview_1_f5qisp.jpg"
              alt="Nationwide Listings"
              className="absolute inset-0 w-full h-half object-cover"
            />

            <div className="absolute inset-0 bg-white/5" />

            <div className="relative z-0 flex flex-col justify-between h-full p-4">
              <h3 className="text-2xl md:text-h1 font-bold text-black leading-tight">
                Nationwide
                <br />
                Listings!
              </h3>
              <button
                onClick={() => navigate('/about')}
                className="bg-[#E3E8FF] text-[#122D8A] text-xs font-semibold px-3 py-1.5 rounded-lg w-fit mt-2"
              >
                Read About Us
              </button>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-2xl p-5 text-white mb-5 relative overflow-hidden">
          <img
            src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781215326/LOGO_fsgsib.svg"
            alt=""
            className="absolute right-0 bottom-0 opacity-10 w-102 h-72 object-contain pointer-events-none"
          />

          <h3 className="text-lg font-semibold mb-3">Earnings Overview</h3>

          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm text-white">This Month</span>
            <FaChevronDown className="text-white w-3 h-3" />
          </div>

          <p className="text-4xl font-bold mb-1">
            {formatNaira(earnings.amount)}
          </p>
          <p className="text-sm text-white mb-3">Total Earnings</p>

          <div className="flex items-center gap-2">
            <span className="bg-[#B4FFCF] text-body text-[#102B84] font-bold px-2 py-1 rounded-full">
              {earnings.growth >= 0
                ? `+${earnings.growth}%`
                : `${earnings.growth}%`}
              <span className="text-body text-[#102B84]"> this month</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <div className="bg-[#E7FFEF] rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <FaHome className="w-5 h-5  text-green-500" />
            </div>
            <p className="text-2xl font-bold text-text-primary mb-2">
              {stats.activeListings}
            </p>
            <p className="text-body text-text-tertiary mb-1">Active Listings</p>

            <button
              onClick={() => navigate('/my-listings')}
              className="text-body text-[#16A34A] font-medium"
            >
              View all
            </button>
          </div>

          <div className="bg-[#E6ECFF] rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <FaComments className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-text-primary mb-2">
              {stats.newInquiries}
            </p>
            <p className="text-body text-text-tertiary mb-1">New Inquiries</p>

            <button
              onClick={() => navigate('/messages')}
              className="text-body text-[#143090] font-medium"
            >
              View all
            </button>
          </div>

          <div className="bg-[#DFFFFD] rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
              <FaChartLine className="w-5 h-5 text-teal-500" />
            </div>
            <p className="text-2xl font-bold text-text-primary mb-2">
              {stats.profileViews}
            </p>
            <p className="text-body text-text-tertiary mb-1">Profile Views</p>

            <span className="text-body text-[#04E0D5]">This Month</span>
          </div>

          <div className="bg-[#FFECCB] rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
              <FaWallet className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-text-primary mb-2">
              {formatNaira(stats.totalEarnings)}
            </p>
            <p className="text-xs text-text-tertiary mb-1">Total Earnings</p>

            <span className="text-body text-[#F59E08]">This Month</span>
          </div>
        </div>

        <h2 className="text-h3 font-bold text-text-primary mb-3">
          My Listings
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-3 mb-5 scrollbar-hide">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="min-w-[220px] bg-white rounded-2xl overflow-hidden shadow-card flex-shrink-0 cursor-pointer"
              onClick={() => navigate(`/listings/${listing.id}`)}
            >
              <div className="relative h-36">
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#79FFAB] text-success text-[13px] font-bold  px-2 py-0.5 rounded-full">
                  {listing.status}
                </span>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-bold text-text-primary mb-1">
                  {listing.title}
                </h3>
                <p className="text-primary font-bold text-sm mb-2">
                  {formatNaira(listing.price)}{' '}
                  <span className="text-xs text-text-tertiary font-normal">
                    / year
                  </span>
                </p>
                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <FaBed className="w-3 h-3" />
                    {listing.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBath className="w-3 h-3" />
                    {listing.baths} Baths
                  </span>
                  {listing.hasParking && (
                    <span className="flex items-center gap-1">
                      <FaCar className="w-3 h-3" />
                      Parking
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-h3 font-bold text-text-primary mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-5 gap-2 mb-5">
          <button
            onClick={() => navigate('/verify-property')}
            className="bg-[#102B84] rounded-2xl p-3 flex flex-col items-center justify-center gap-2"
          >
            <FaPlus className="w-5 h-5 text-white" />
            <span className="text-[12px] font-semibold text-white text-center leading-tight">
              Create Listing
            </span>
          </button>

          <button
            onClick={() => navigate('/my-listings')}
            className="bg-[#00FFF2] rounded-2xl p-3 flex flex-col items-center justify-center gap-2"
          >
            <FaList className="w-5 h-5 text-white" />
            <span className="text-[12px] font-semibold text-[#017A74] text-center leading-tight">
              My Listings
            </span>
          </button>

          <button
            onClick={() => navigate('/messages')}
            className="bg-[#F59E08] rounded-2xl p-3 flex flex-col items-center justify-center gap-2"
          >
            <FaEnvelope className="w-5 h-5 text-white" />
            <span className="text-[12px] font-semibold text-white text-center leading-tight">
              Messages
            </span>
          </button>

          <button
            onClick={() => navigate('/calendar')}
            className="bg-[#019EFF] rounded-2xl p-3 flex flex-col items-center justify-center gap-2"
          >
            <FaCalendarAlt className="w-5 h-5 text-white" />
            <span className="text-[11px] font-semibold text-white text-center leading-tight">
              Manage Availability
            </span>
          </button>

          <button
            onClick={() => navigate('/earnings')}
            className="bg-[#16A34A] rounded-2xl p-3 flex flex-col items-center justify-center gap-2"
          >
            <FaWallet className="w-5 h-5 text-white" />
            <span className="text-[12px] font-semibold text-white text-center leading-tight">
              Earnings
            </span>
          </button>
        </div>

        <h2 className="text-base font-bold text-text-primary mb-3">
          Recent Inquiries
        </h2>
        <div className="flex flex-col gap-3 mb-6">
          {loading && (
            <p className="text-center text-text-tertiary py-8">Loading...</p>
          )}
          {!loading && inquiries.length === 0 && (
            <p className="text-center text-text-tertiary py-8">
              No inquiries yet
            </p>
          )}
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => navigate(`/messages?inquiry=${inquiry.id}`)}
              className="bg-[#E5F5FF] rounded-2xl p-4 shadow-card cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={inquiry.tenantAvatar}
                    alt={inquiry.tenantName}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  {inquiry.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-sm font-bold text-text-primary">
                      {inquiry.tenantName}
                    </h4>
                    {inquiry.unreadCount > 0 && (
                      <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {inquiry.unreadCount} new
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary mb-1">
                    {inquiry.propertyTitle} • {inquiry.location}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {inquiry.message}
                  </p>
                </div>

                <span className="text-xs text-text-tertiary flex-shrink-0 ml-2">
                  {timeAgo(inquiry.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
