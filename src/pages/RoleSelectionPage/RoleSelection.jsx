import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RoleSelectionPage = () => {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'renter',
      title: 'Renter',
      description: 'I want to find a place to rent',
      image:
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781216320/Rectangle_690_t2jany.jpg',
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'I help people find rental properties',
      image:
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781216320/Rectangle_691_nkkczd.jpg',
    },
    {
      id: 'landlord',
      title: 'Landlord',
      description: 'I want to list and manage my properties',
      image:
        'https://res.cloudinary.com/dty5t7pq7/image/upload/v1781216320/Rectangle_692_pbygnu.jpg',
    },
  ]

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('signupRole', selectedRole)
      navigate('/signup')
    }
  }

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-8 bg-background-secondary min-h-screen">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <img
              src=" https://res.cloudinary.com/dty5t7pq7/image/upload/v1781215326/LOGO_fsgsib.svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            ></img>
          </div>
          <span className="text-text-primary text-xl font-bold">
            Safe<span className="text-primary">Nest</span>
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <img
            src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1780844868/view-3d-house-model_1_pb87ww.jpg"
            alt="3D House"
            className="w-full max-w-sm object-contain"
          />
        </div>

        <div className="h-9" />
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-1">
              Register As
            </h1>
            <p className="text-sm text-text-secondary">
              Choose how you want to use SafeNest
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    flex items-center gap-0 rounded-xl border cursor-pointer
                    overflow-hidden transition-all duration-150
                    ${
                      isSelected
                        ? 'border-primary border-2'
                        : 'border-border border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="w-36 h-24 flex-shrink-0">
                    <img
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 px-5">
                    <h3 className="text-base font-semibold text-text-primary">
                      {role.title}
                    </h3>
                    <p className="text-sm text-text-tertiary mt-0.5">
                      {role.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              w-full py-3 rounded-xl text-base font-semibold transition-all duration-150
              ${
                selectedRole
                  ? 'bg-primary text-white hover:opacity-90'
                  : 'bg-border text-text-tertiary cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
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
