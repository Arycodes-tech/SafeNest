import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { FaCheckCircle } from 'react-icons/fa'
import { FaUser, FaHandshake, FaBuilding } from 'react-icons/fa'

export const RoleSelectionPage = () => {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'renter',
      title: 'Renter',
      description: 'I want to find a place to rent',
      icon: <FaUser className="w-12 h-12 text-primary" />,
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'I help people find rental properties',
      icon: <FaHandshake className="w-12 h-12 text-primary" />,
    },
    {
      id: 'landlord',
      title: 'Landlord',
      description: 'I want to list and manage my properties',
      icon: <FaBuilding className="w-12 h-12 text-primary" />,
    },
  ]

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('signupRole', selectedRole)
      navigate('/signup')
    }
  }

  return (
    <div className="min-h-screen bg-background-primary grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block relative bg-primary/5">
        <img
          src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1780844868/view-3d-house-model_1_pb87ww.jpg"
          alt="image"
          className="w-3/4 h-auto object-contain rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Register As
            </h1>
            <p className="text-base text-text-secondary">
              Choose how you want to use SafeNest
            </p>
          </div>

          {/* Role cards */}
          <div className="space-y-4 mb-10">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    relative flex items-center gap-5 p-5 rounded-2xl border-2 cursor-pointer
                    transition-all duration-200 hover:shadow-lg
                    ${
                      isSelected
                        ? 'border-primary bg-background-hover shadow-md'
                        : 'border-border bg-white hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`
                      w-14 h-14 rounded-xl flex items-center justify-center
                      ${isSelected ? 'bg-primary/10' : 'bg-background-secondary'}
                    `}
                    >
                      {role.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {role.title}
                    </h3>
                    <p className="text-sm text-text-tertiary mt-0.5">
                      {role.description}
                    </p>
                  </div>

                  {isSelected && (
                    <FaCheckCircle className="text-primary w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Button
              variant="primary"
              size="large"
              fullWidth
              disabled={!selectedRole}
              onClick={handleContinue}
              className="py-3 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Continue
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-text-tertiary">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
