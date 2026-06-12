import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaBookmark, FaEnvelope, FaUser } from 'react-icons/fa'

export const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setUserRole(user.role)
  }, [])

  const getHomePath = () => {
    if (userRole === 'renter') return '/homepage'
    return '/dashboard'
  }

  const getProfilePath = () => {
    if (userRole === 'renter') return '/renter/profile'
    return '/profile'
  }

  if (!userRole) return null

  const tabs = [
    { name: 'Home', icon: <FaHome className="text-xl" />, path: getHomePath() },
    { name: 'Saved', icon: <FaBookmark className="text-xl" />, path: '/saved' },
    {
      name: 'Messages',
      icon: <FaEnvelope className="text-xl" />,
      path: '/messages',
    },
    {
      name: 'Profile',
      icon: <FaUser className="text-xl" />,
      path: getProfilePath(),
    },
  ]

  const isActive = (path) => {
    if (path === '/homepage' || path === '/dashboard') {
      return (
        location.pathname === '/homepage' || location.pathname === '/dashboard'
      )
    }

    if (path === '/renter/profile' || path === '/profile') {
      return (
        location.pathname === '/renter/profile' ||
        location.pathname === '/profile'
      )
    }

    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-border bg-white px-2 py-2 font-sans shadow-floating sm:relative sm:rounded-2xl sm:border sm:px-3">
      {tabs.map((tab) => {
        const active = isActive(tab.path)
        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all duration-200 hover:bg-background-hover"
          >
            <span
              className={`text-xl leading-none ${active ? 'text-primary' : 'text-text-tertiary'}`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-xs md:text-sm ${active ? 'font-bold text-primary' : 'text-text-tertiary'}`}
            >
              {tab.name}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200 ${active ? 'opacity-100' : 'opacity-0'}`}
            />
          </button>
        )
      })}
    </nav>
  )
}
