import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaUser,
  FaFileAlt,
  FaBell,
  FaLock,
  FaQuestionCircle,
  FaFileContract,
  FaSignOutAlt,
  FaCheckCircle,
} from 'react-icons/fa'
import { BottomNavigation } from '../../components/layout/BottomNavigation'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    isVerified: false,
  })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser({
      name: storedUser.name || 'Alade Karunwi',
      email: storedUser.email || 'aladekarunwi@gmail.com',
      avatar:
        storedUser.avatar ||
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781215326/LOGO_fsgsib.svg',
      isVerified: storedUser.isVerified || true,
    })
  }, [])

  const menuItems = [
    { icon: <FaUser />, label: 'Profile', path: '/profile/edit' },
    { icon: <FaFileAlt />, label: 'My Documents', path: '/documents' },
    {
      icon: <FaBell />,
      label: 'Notification Settings',
      path: '/notifications-settings',
    },
    { icon: <FaLock />, label: 'Privacy & Security', path: '/privacy' },
    { icon: <FaQuestionCircle />, label: 'Help & Support', path: '/help' },
    { icon: <FaFileContract />, label: 'Terms & Conditions', path: '/terms' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('signupRole')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background-secondary pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-10 text-center pb-4 border-b border-border">
        <h1 className="text-h1 font-bold text-text-primary">Profile</h1>
      </div>

      <div className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-card flex items-center gap-4 md:mx-auto md:max-w-2xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-text-primary">{user.name}</h2>
            {user.isVerified && (
              <FaCheckCircle className="text-primary w-5 h-5" />
            )}
          </div>
          <p className="text-sm text-text-tertiary">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 mx-4 bg-white border border-border rounded-2xl overflow-hidden shadow-card md:mx-auto md:max-w-2xl">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-4 text-left text-text-primary hover:bg-background-hover transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <span className="text-primary w-5">{item.icon}</span>
            <span className="text-body font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-6 px-4">
        <button
          onClick={handleLogout}
          className="w-full max-w-xs flex mb-4 items-center justify-center gap-2 bg-error text-white font-semibold py-3 rounded-xl hover:bg-error/80 transition-colors"
        >
          <FaSignOutAlt />
          <span>Log out</span>
        </button>
      </div>

      <BottomNavigation />
    </div>
  )
}
