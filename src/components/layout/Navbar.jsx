import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import logo from '../../assets/logos/logo.svg'

export const Navbar = () => {
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white px-4 py-3 font-sans md:px-8 md:py-4">
      <button
        onClick={() => scrollToSection('hero')}
        className="flex items-center gap-2"
      >
        <img src={logo} alt="SafeNest" className="h-6 w-auto md:h-8" />
        <div>
          <strong className="text-lg font-bold text-text-primary md:text-xl">
            Safe<span className="text-primary-light">Nest</span>
          </strong>
        </div>
      </button>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
        <button
          onClick={() => scrollToSection('hero')}
          className="hover:text-primary"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('listings')}
          className="hover:text-primary"
        >
          Verified Listings
        </button>
        <button
          onClick={() => scrollToSection('how-it-works')}
          className="hover:text-primary"
        >
          How it works
        </button>
        <button
          onClick={() => scrollToSection('safety')}
          className="hover:text-primary"
        >
          Safety Center
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="small"
          onClick={() => navigate('/login')}
        >
          Log in
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={() => navigate('/role')}
        >
          Sign up
        </Button>
      </div>
    </nav>
  )
}
