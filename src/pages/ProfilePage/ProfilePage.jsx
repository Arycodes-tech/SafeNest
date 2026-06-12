import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaUser,
  FaShieldAlt,
  FaClipboardList,
  FaHeart,
  FaCalendarCheck,
  FaCreditCard,
  FaBell,
  FaQuestionCircle,
  FaCog,
  FaChevronRight,
  FaCheckCircle,
  FaSignOutAlt,
} from 'react-icons/fa'
import { HiShieldCheck } from 'react-icons/hi'
import { BottomNavigation } from '../../components/layout/BottomNavigation'

const MENU_ITEMS = [
  { icon: FaUser, label: 'Personal Information', route: '/profile/personal' },
  { icon: FaShieldAlt, label: 'Verification', route: '/profile/verification' },
  { icon: FaClipboardList, label: 'My Requests', route: '/profile/requests' },
  { icon: FaHeart, label: 'Saved Listings', route: '/saved' },
  { icon: FaCalendarCheck, label: 'My Bookings', route: '/profile/bookings' },
  { icon: FaCreditCard, label: 'Payment Methods', route: '/profile/payment' },
  { icon: FaBell, label: 'Notifications', route: '/notifications' },
  { icon: FaQuestionCircle, label: 'Help & Support', route: '/support' },
  { icon: FaCog, label: 'Settings', route: '/settings' },
]

const RenterProfilePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('user')

    if (!token || !stored) {
      navigate('/login')
      return
    }
    const parsed = JSON.parse(stored)
    if (parsed.role !== 'renter') {
      navigate('/profile')
      return
    }

    setUser(parsed)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('signupRole')
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  if (!user) return null
  return (
    <div className="min-h-screen bg-background-secondary pb-24">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <HiShieldCheck className="text-primary w-7 h-7" />
            <span className="text-base font-bold text-text-primary">
              Safe<span className="text-primary">Nest</span>
            </span>
          </div>
          <h1 className="text-base font-semibold text-text-primary">Profile</h1>
          <button
            onClick={() => navigate('/notifications')}
            className="relative"
          >
            <FaBell className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="mx-4 bg-primary rounded-2xl px-5 py-5 text-white flex items-center gap-4 shadow-md mb-5">
          <div className="relative flex-shrink-0">
            <img
              src={
                user.avatarUrl ||
                'https://randomuser.me/api/portraits/lego/1.jpg'
              }
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <h2 className="font-semibold text-base truncate">{user.name}</h2>
              <FaCheckCircle className="w-3.5 h-3.5 text-white flex-shrink-0" />
            </div>
            <p className="text-xs text-blue-100 truncate mb-1">{user.email}</p>
            <p className="text-sm text-white">
              {user.phone || '+234 000 000 0000'}
            </p>
          </div>
        </div>

        <div className="mx-4 bg-white border border-border rounded-2xl overflow-hidden mb-5">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon
            const isLast = index === MENU_ITEMS.length - 1
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center justify-between px-4 py-4 hover:bg-background-secondary transition-colors ${
                  !isLast ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {item.label}
                  </span>
                </div>
                <FaChevronRight className="w-3 h-3 text-text-tertiary flex-shrink-0" />
              </button>
            )
          })}
        </div>

        <div className="mx-4 mb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#DC2626] py-3.5 rounded-2xl border border-error text-white font-semibold text-sm hover:bg-error/50 transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}

export default RenterProfilePage
