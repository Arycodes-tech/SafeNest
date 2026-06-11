import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaBookmark, FaEnvelope, FaUser } from 'react-icons/fa'

export const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { name: 'Home', icon: <FaHome className="text-xl" />, path: '/home' },
    { name: 'Saved', icon: <FaBookmark className="text-xl" />, path: '/saved' },
    {
      name: 'Messages',
      icon: <FaEnvelope className="text-xl" />,
      path: '/messages',
    },
    { name: 'Profile', icon: <FaUser className="text-xl" />, path: '/profile' },
  ]
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
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
              className={`text-body md:text-h2 ${active ? 'font-bold text-primary' : 'text-text-tertiary'}`}
            >
              {tab.name}
            </span>

            <span
              className={`h-1.5 w-1.5 rounded-full bg-primary transition-all duration-200 md:h-3.5 w-3.5 ${
                active ? 'opacity-500' : 'opacity-0'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
