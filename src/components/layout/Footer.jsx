import logo from '../../assets/logos/logo.svg'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export const Footer = () => {
  return (
    <footer className="bg-dark px-12 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-7xl px-40 py-40">
        {/* Grid: on mobile 1 column, on tablet 2 columns, on desktop 5 columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr]">
          {/* ----- COLUMN 1: Brand + Socials ----- */}
          <div>
            {/* Logo row: image + text */}
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="SafeNest Logo" className="h-9 w-auto" />
              <div>
                <strong className="text-white">SafeNest</strong>
                <p className="m-0 text-caption text-footer-muted">
                  Verified rentals
                </p>
              </div>
            </div>
            {/* Brand description */}
            <p className="mb-4 text-small leading-[22px] text-footer-muted">
              Nigeria’s trusted platform for fraud-free rentals. Verified
              agents, secure deposits, zero scams.
            </p>

            {/* Social icons – using simple letters inside circles */}
            <div className="flex gap-4">
              {/* Facebook – 'f' inside a circle */}
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-center text-sm text-white hover:bg-white/20"
              >
                f
              </a>
              {/* Instagram – 'in' inside a circle */}
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-center text-sm text-white hover:bg-white/20"
              >
                in
              </a>
              {/* Twitter – 't' inside a circle */}
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-center text-sm text-white hover:bg-white/20"
              >
                t
              </a>
              {/* YouTube – 'yt' inside a circle */}
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-center text-sm text-white hover:bg-white/20"
              >
                yt
              </a>
            </div>
          </div>

          {/* ----- COLUMN 2: Platform Links ----- */}
          <div>
            <h4 className="mb-3 text-base font-semibold">Platform</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Verified Listings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Safety Centre
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* ----- COLUMN 3: Company Links ----- */}
          <div>
            <h4 className="mb-3 text-base font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* ----- COLUMN 4: Support Links ----- */}
          <div>
            <h4 className="mb-3 text-base font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Help Centre
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-small text-footer-muted hover:text-white"
                >
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* ----- COLUMN 5: Newsletter Signup ----- */}
          <div>
            <h4 className="mb-3 text-base font-semibold">Stay Updated</h4>
            <p className="mb-3 text-small text-footer-muted">
              Get the latest listings and safety tips delivered to your inbox.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Email input – style for dark background */}
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 text-white placeholder:text-footer-muted"
              />
              {/* Subscribe button */}
              <Button variant="primary" size="small">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM COPYRIGHT BAR ===== */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-caption text-footer-muted">
          &copy; {new Date().getFullYear()} SafeNest. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
