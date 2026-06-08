import logo from '../../assets/logos/logo.svg'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="bg-dark px-4 py-12 text-white sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="SafeNest Logo" className="h-9 w-auto" />
              <div>
                <strong className="text-white">SafeNest</strong>
                <p className="m-0 text-caption text-footer-muted">
                  Verified rentals
                </p>
              </div>
            </div>
            <p className="mb-4 text-small leading-[22px] text-footer-muted">
              Nigeria’s trusted platform for fraud-free rentals. Verified
              agents, secure deposits, zero scams.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

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

          <div>
            <h4 className="mb-3 text-base font-semibold">Stay Updated</h4>
            <p className="mb-3 text-small text-footer-muted">
              Get the latest listings and safety tips delivered to your inbox.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 text-white placeholder:text-footer-muted"
              />
              <Button variant="primary" size="small">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-caption text-footer-muted">
          &copy; {new Date().getFullYear()} SafeNest. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
