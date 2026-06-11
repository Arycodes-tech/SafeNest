import { useNavigate } from 'react-router-dom'
import { BsCheckLg } from 'react-icons/bs'
import { Button } from '../../components/ui/Button'

export const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white md:bg-background-secondary flex flex-col">
      <div className="hidden md:block p-6">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-h1 text-text-primary">
            Safe<span className="text-primary-light">Nest</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 flex items-start md:items-center justify-center px-6 md:px-4 pt-24 md:pt-0">
        <div
          className="
          w-full md:max-w-sm
          md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-border
          md:px-10 md:py-12
          flex flex-col items-center text-center
        "
        >
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-8">
            <BsCheckLg className="text-white text-4xl" />
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">
            You're all set!
          </h1>

          <p className="text-sm text-text-secondary mb-12">
            Welcome to your renter account. <br /> Let's find your next home
          </p>

          <div
            className="
            fixed bottom-0 left-0 right-0 px-6 pb-8 bg-white
            md:static md:w-full md:px-0 md:pb-0 md:bg-transparent
            flex flex-col items-center gap-3
          "
          >
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/homepage')}
            >
              Explore Listings
            </Button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-sm text-text-secondary underline hover:text-text-primary transition-colors"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
