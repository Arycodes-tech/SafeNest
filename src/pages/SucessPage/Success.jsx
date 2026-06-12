import { useNavigate } from 'react-router-dom'
import { BsCheckLg } from 'react-icons/bs'

export const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white md:bg-background-secondary flex flex-col">
      <div className="hidden md:flex items-center gap-2 p-6">
        <img
          src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1781215326/LOGO_fsgsib.svg"
          className="text-primary w-9 h-9"
        />
        <span className="text-xl font-bold text-text-primary">
          Safe<span className="text-primary md:text-h3">Nest</span>
        </span>
      </div>

      <div className="flex-1 flex items-start md:items-center justify-center px-6 md:px-4 pt-24 md:pt-0">
        <div
          className="
          w-full md:max-w-md
          md:bg-white md:rounded-2xl
          md:border-2 md:border-border
          md:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          md:px-12 md:py-14
          flex flex-col items-center text-center
        "
        >
          <div className="w-28 h-28 rounded-full bg-success flex items-center justify-center mb-8">
            <BsCheckLg className="text-white  text-5xl" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
            You're all set!
          </h1>

          <p className="text-sm md:text-base text-text-secondary mb-14 leading-relaxed">
            Welcome to your renter account.
            <br />
            Let's find your next home
          </p>

          <div
            className="
            fixed bottom-0 left-0 right-0 px-6 pb-8 bg-white
            md:static md:w-full md:px-0 md:pb-0 md:bg-transparent
            flex flex-col items-center gap-4
          "
          >
            <button
              onClick={() => navigate('/browse/properties')}
              className="w-full bg-primary text-white font-semibold py-4 rounded-xl text-base hover:opacity-90 transition-opacity"
            >
              Explore Listings
            </button>

            <button
              onClick={() => navigate('/homepage')}
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
