import { Button } from '../ui/Button'
import logo from '../../assets/logos/logo.svg'

export const Navbar = () => {
  return (
    // This controls the full navbar container.
    <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white px-4 py-4 font-sans sm:px-6">
      <div className="flex items-center gap-2.5">
        {/* This is a simple temporary logo until the final logo file is added. */}
        <img src={logo} alt="SafeNest Logo" className="h-9 w-9" />
        <div>
          <strong className="text-text-primary">SafeNest</strong>
          <p className="m-0 text-caption text-text-tertiary">
            Verified rentals
          </p>
        </div>
      </div>

      {/* These are the primary navigation links. */}
      <div className="hidden items-center gap-5 text-small text-text-secondary md:flex">
        <span>Home</span>
        <span>Verified Listings</span>
        <span>How It Works</span>
        <span>Safety Center</span>
      </div>

      {/* These are the account actions on the right side of the navbar. */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="small">
          Log in
        </Button>
        <Button size="small">Sign up</Button>
      </div>
    </nav>
  )
}
