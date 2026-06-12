import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaChevronLeft,
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard,
} from 'react-icons/fa'
import { BottomNavigation } from '../../components/layout/BottomNavigation'

// --- Mock data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Alexa Johnson',
    description: "Hi, I'm interested in the 2 bedroom....",
    timeAgo: '2m ago',
    read: false,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    link: '/chat/alexa',
  },
  {
    id: 2,
    type: 'system',
    title: 'Viewing scheduled',
    description:
      'Your viewing for 2 Bedroom Apartment is tomorrow at 11:00 AM.',
    timeAgo: '1h ago',
    read: false,
    avatar: null,
    link: '/bookings',
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment received',
    description: 'Your payment of ₦250,000 was successful.',
    timeAgo: '3h ago',
    read: true,
    avatar: null,
    link: '/transactions',
  },
  {
    id: 4,
    type: 'system',
    title: 'Request approved',
    description: 'Your request to rent 3 bedroom Apartment has been approved.',
    timeAgo: '1d ago',
    read: true,
    avatar: null,
    link: '/bookings',
  },
]

export const NotificationPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setNotifications(MOCK_NOTIFICATIONS)
      setLoading(false)
    }
    fetchNotifications()
  }, [])

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'all') return true
    return notif.type === activeTab
  })

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <FaEnvelope className="text-primary" size={18} />
      case 'system':
        return <FaCalendarAlt className="text-warning" size={18} />
      case 'payment':
        return <FaCreditCard className="text-success" size={18} />
      default:
        return <FaBell className="text-text-tertiary" size={18} />
    }
  }

  return (
    <div className="min-h-screen bg-background-secondary font-sans pb-16">
      <div className="sticky top-0 z-10 bg-background-primary px-4 pt-12 pb-3 shadow-floating">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center"
          >
            <FaChevronLeft className="text-text-primary" size={20} />
          </button>
          <h1 className="text-h2 font-bold text-text-primary">Notifications</h1>
        </div>

        <div className="flex gap-4 mt-4 border-b border-border md:gap-6">
          {['all', 'message', 'system', 'payment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors md:text-base ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-tertiary'
              }`}
            >
              {tab === 'all'
                ? 'All'
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {loading ? (
          <div className="text-center py-10 text-text-tertiary">Loading...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-10 text-text-tertiary">
            No notifications yet
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => navigate(notif.link)}
                className={`bg-background-primary rounded-xl p-4 shadow-card flex gap-3 cursor-pointer hover:shadow-md transition-shadow ${
                  !notif.read ? 'border-l-4 border-primary' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  {notif.avatar ? (
                    <img
                      src={notif.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-background-hover flex items-center justify-center">
                      {getIcon(notif.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-small font-semibold text-text-primary">
                      {notif.title}
                    </h3>
                    <span className="text-caption text-text-tertiary ml-2 whitespace-nowrap">
                      {notif.timeAgo}
                    </span>
                  </div>
                  <p className="text-caption text-text-secondary mt-1">
                    {notif.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
