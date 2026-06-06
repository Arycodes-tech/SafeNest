import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
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
      icon: <FaUser className="w-10 h-10 text-text-tertiary" />,
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'I help people find rental properties',
      icon: <FaHandshake className="w-10 h-10 text-text-tertiary" />,
    },
    {
      id: 'landlord',
      title: 'Landlord',
      description: 'I want to list and manage my properties',
      icon: <FaBuilding className="w-10 h-10 text-text-tertiary" />,
    },
  ]

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('signupRole', selectedRole)
      navigate('/signup')
    }
  }

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-md py-xl">
      <div className="max-w-md w-full">
        <h1 className="text-h1 text-text-primary text-center mb-xs">
          Register As
        </h1>
        <p className="text-body text-text-secondary text-center mb-xl">
          Choose how you want to use SafeNest
        </p>
        <div className="flex flex-col gap-md mb-xl">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id
            
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative flex items-center gap-md p-md rounded-md border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-background-hover'
                    : 'border-border bg-white hover:border-primary-light'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-black-700">
                    {role.title}
                  </h3>
                  <p className="text-small text-text-tertiary">
                    {role.description}
                  </p>
                </div>
                {isSelected && (
                  <FaCheckCircle className="text-primary w-6 h-6 absolute right-4 top-1/2 -translate-y-1/2" />
                )}
              </div>
            )
          })}
        </div>
        <div className="flex justify-center">
          <Button
            variant="primary"
            className="px-8 w-full rounded-md"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
        <p className="mt-md text-center text-small text-text-tertiary">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
