import { useState } from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { PropertyCard } from '../../components/property/PropertyCard'
import {
  HiOutlineSearch,
  HiOutlineLocationMarker,
  HiOutlineBadgeCheck,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineChat,
  HiOutlineIdentification,
  HiOutlineHome,
  HiOutlineEye,
  HiOutlineScale,
  HiOutlineUsers,
  HiOutlineThumbUp,
  HiOutlineFlag,
  HiOutlineChevronDown,
  HiOutlineUserCircle,
  HiOutlineArrowRight,
} from 'react-icons/hi'

import { MdVerified, MdArticle, MdSecurity, MdBolt } from 'react-icons/md'

const trustItems = [
  { icon: HiOutlineBadgeCheck, label: 'Verified Landlord & Agents' },
  { icon: HiOutlineLockClosed, label: 'Escrow Protected' },
  { icon: HiOutlineShieldCheck, label: 'Fraud Prevention' },
  {
    icon: HiOutlineChat,
    label: 'Secure In-App Communication',
  },
]

const stats = [
  {
    value: '8,000+',
    label: 'Verified Landlords',
    sub: 'Rigorous KYC & Background checks',
  },
  {
    value: '1,700+',
    label: 'Verified Agents',
    sub: 'Licensed & Trusted professionals',
  },
  {
    value: '2M',
    label: 'Fraud Prevented',
    sub: 'Blocked & Flagged suspicious rental scams',
  },
  {
    value: '9,000+',
    label: 'Escrow Transactions',
    sub: 'Secure payments handled',
  },
]

const steps = [
  {
    number: '1',
    title: 'Browse Verified Listings',
    desc: 'Properties listed by verified Landlords & Agents',
  },
  {
    number: '2',
    title: 'Chat Safely In-App',
    desc: 'Communicate securely with our encrypted chat system',
  },
  {
    number: '3',
    title: 'Schedule Viewing',
    desc: 'Book inspections and view properties at your convenience',
  },
  {
    number: '4',
    title: 'Pay Secure Holding Deposit',
    desc: 'Your deposit is held safely in escrow by SafeNest',
  },
  {
    number: '5',
    title: 'Confirm Move-In',
    desc: 'Funds are released only after you confirm a successful deal',
  },
]

const trustFeatures = [
  {
    icon: HiOutlineIdentification,
    title: 'Government ID verification',
    desc: 'We verify identities with official issued documents before access is granted.',
  },
  {
    icon: HiOutlineHome,
    title: 'Property ownership verification',
    desc: 'We confirm ownership before any listing goes live on the platform.',
  },
  {
    icon: HiOutlineLockClosed,
    title: 'Escrow protected deposits',
    desc: 'Funds are held securely and only released after both parties confirm.',
  },
  {
    icon: HiOutlineEye,
    title: 'Fraud monitoring 24/7',
    desc: 'Our systems detect and block suspicious activity in real time, around the clock.',
  },
  {
    icon: HiOutlineScale,
    title: 'Dispute resolution support',
    desc: 'Our team is here to mediate and resolve issues quickly and fairly.',
  },
  {
    icon: HiOutlineChat,
    title: 'In-app communication logs',
    desc: 'Chat, call, and share docs securely, all activity is logged in-app.',
  },
]

const verifyBenefits = [
  {
    icon: HiOutlineBadgeCheck,
    title: 'Stand out as verified',
    desc: 'Get a trust badge visible on all your listings.',
  },
  {
    icon: HiOutlineUsers,
    title: 'Attract serious tenants',
    desc: 'Verified profiles get 3x more qualified inquiries',
  },
  {
    icon: HiOutlineThumbUp,
    title: 'Build more trust',
    desc: 'Renters feel safe dealing with a verified agent',
  },
  {
    icon: MdBolt,
    title: 'Rent faster',
    desc: 'Close deals quicker with platform-backed credibility.',
  },
]

const scamCards = [
  {
    icon: HiOutlineEye,
    title: '24/7 Monitoring',
    desc: 'Our systems watch for suspicious activity around the clock and act immediately.',
  },
  {
    icon: MdSecurity,
    title: 'AI-Powered Scam Detection',
    desc: 'Our model scans and removes suspicious listings before they reach renters.',
  },
  {
    icon: MdArticle,
    title: 'Common Rental Scams',
    desc: 'Know what to watch out for. Read our guide to stay one step ahead of fraudsters.',
  },
  {
    icon: HiOutlineFlag,
    title: 'Report Suspicious Listings',
    desc: 'See something off? Flag it instantly and help keep the platform safe for everyone.',
  },
]

const testimonials = [
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
  {
    name: 'Fikayo Salami',
    role: 'Renter',
    location: 'Lagos, Nigeria',
    text: 'SafeNest gave me the confidence to pay my deposit. Everything was verified and transparent.',
    avatar: HiOutlineUserCircle,
  },
]

const faqs = [
  {
    question: 'How does verification work?',
    answer:
      'Landlords and agents submit their government ID and property ownership documents. Our team reviews and approves them within 24 hours. Once approved they receive a verified badge on their profile and listings.',
  },
  {
    question: 'How is my deposit protected?',
    answer:
      'Your deposit is held in escrow by SafeNest and is never sent directly to the landlord. Funds are only released after you confirm a successful move-in. If anything goes wrong you get a full refund.',
  },
  {
    question: 'What happens if I find a scam listing?',
    answer:
      'Use the Report Listing button on any property page. Our team reviews reports within hours and removes fraudulent listings immediately. You can also contact our support team directly.',
  },
]

function SearchBar() {
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSearch = () => {
    console.log({ location, propertyType, priceRange })
  }

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-3 max-w-3xl shadow-card">
      <div className="flex-1">
        <label className="block text-caption text-text-tertiary mb-1">
          Location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-small text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          <option value="">Search location, estate etc</option>
          <option value="lekki">Lekki, Lagos</option>
          <option value="yaba">Yaba, Lagos</option>
          <option value="ikeja">Ikeja, Lagos</option>
          <option value="vi">Victoria Island, Lagos</option>
          <option value="abuja">Abuja</option>
          <option value="ph">Port Harcourt</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-caption text-text-tertiary mb-1">
          Property Type
        </label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-small text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          <option value="">Search location, estate etc</option>
          <option value="flat">Flat / Apartment</option>
          <option value="duplex">Duplex</option>
          <option value="bungalow">Bungalow</option>
          <option value="selfcontain">Self Contain</option>
          <option value="roomandparlour">Room & Parlour</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-caption text-text-tertiary mb-1">
          Price Range
        </label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-small text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          <option value="">₦500,000 - ₦50,000,000</option>
          <option value="500k-1m">₦500,000 - ₦1,000,000</option>
          <option value="1m-2m">₦1,000,000 - ₦2,000,000</option>
          <option value="2m-5m">₦2,000,000 - ₦5,000,000</option>
          <option value="5m-10m">₦5,000,000 - ₦10,000,000</option>
          <option value="10m+">₦10,000,000+</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-primary text-white px-6 py-2.5 rounded-lg text-small font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <HiOutlineSearch className="w-4 h-4" />
          <span>Search Listings</span>
        </button>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-background-secondary transition-colors"
      >
        <span className="text-small font-medium text-text-primary">
          {question}
        </span>
        <HiOutlineChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-4">
          <p className="text-small text-text-secondary leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background-secondary font-sans">
      <Navbar />

      <section
        id="hero"
        className="relative min-h-[520px] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dty5t7pq7/image/upload/v1780834395/e0901fce5aa5c561965db8d07c519a71_1_xtfjwm.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-white  text-text-primary text-caption px-3 py-1.5 rounded-full mb-6 border border-white/30">
            <HiOutlineLocationMarker className="w-4 h-4" />
            <span>Africa's Most Trusted Rental Verification Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4 max-w-2xl">
            Rent Safely.
            <br />
            Pay Only When
            <br />
            <span className="text-primary-light">Verified.</span>
          </h1>

          <p className="text-white/90 text-body mb-8 max-w-xl">
            Verified listings. Verified landlords & Agents. Secure deposits.
            <br />
            Zero room for rental scams.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-primary text-white px-6 py-3 rounded-lg text-small font-semibold hover:bg-primary-dark transition-colors">
              Browse Verified Listings
            </button>
            <button className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-lg text-small font-semibold hover:bg-white/10 transition-colors">
              Verify an Agent or Landlord
            </button>
          </div>

          <SearchBar />
        </div>
      </section>

      <section id="trust" className="bg-white border-b border-border py-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-small text-text-secondary"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="bg-[#FFF2F2] py-12 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MdVerified className="w-4 h-4 text-primary" />
                  <span className="text-h2 font-bold text-text-primary">
                    {stat.value}
                  </span>
                </div>
                <p className="text-small font-semibold text-text-primary mb-1">
                  {stat.label}
                </p>
                <p className="text-caption text-text-tertiary">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-48 md:h-64 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dty5t7pq7/image/upload/v1780835468/Screenshot_2026-06-07_133045_fbe3yb.png"
          alt="Nigerian residential street"
          className="w-full h-full object-cover"
        />
      </div>

      <section id="how-it-works" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-h2 font-bold text-text-primary mb-2">
              A Safer Way to Rent
            </h2>
            <p className="text-body text-text-secondary">
              Our end-to-end process protects you at every point
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 md:overflow-visible md:grid md:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex-shrink-0 w-48 md:w-auto border border-border rounded-xl p-4 text-center"
              >
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-small font-bold mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="text-small font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-caption text-text-tertiary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="listings" className="bg-background-secondary py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-h2 font-bold text-text-primary">
              Verified listing near you
            </h2>
            <a
              href="/browse"
              className="text-primary text-small font-medium hover:underline flex items-center gap-1"
            >
              <span>View all listings</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-primary text-white px-6 py-3 rounded-lg text-small font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
              <HiOutlineSearch className="w-4 h-4" />
              Browse Verified Listings
            </button>
          </div>
        </div>
      </section>

      <section id="trust-features" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-primary text-small font-medium">
              Why Trust Us?
            </span>
            <h2 className="text-h2 font-bold text-text-primary mt-2 mb-3">
              Built for Safety, Transparency & Peace of Mind
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="border border-border rounded-xl p-6 hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 bg-[#BDDAFF] rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-small font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-caption text-text-tertiary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-verified" className="bg-background-secondary py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 font-bold text-text-primary mb-8 leading-tight">
                Get Verified.
                <br />
                Build Trust. Close Faster.
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {verifyBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-xl p-4 bg-white"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-small font-semibold text-text-primary mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-caption text-text-tertiary">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              <button className="bg-primary text-white px-6 py-3 rounded-lg text-small font-semibold hover:bg-primary-dark transition-colors">
                Start Verification
              </button>
            </div>

            <div id="safety" className="flex flex-col gap-6">
              <div className="w-full h-48 bg-blue-50 rounded-2xl flex items-center justify-center">
                <HiOutlineLockClosed className="w-16 h-16 text-primary" />
              </div>

              <div className="bg-white border border-border rounded-xl p-6">
                <h3 className="text-h3 font-semibold text-text-primary mb-3">
                  Your Money is safe until you move in
                </h3>
                <p className="text-small text-text-tertiary mb-4 leading-relaxed">
                  We hold your deposit securely. It is only released to the
                  landlord after a successful move in. If something goes wrong,
                  you get your money back
                </p>
                <button className="border border-border text-text-primary px-5 py-2.5 rounded-lg text-small font-medium hover:bg-background-secondary transition-colors">
                  Learn More About Escrow
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-error text-small font-medium mb-3">
              <HiOutlineShieldCheck className="w-4 h-4" />
              <span>Scam Protection</span>
            </div>
            <h2 className="text-h2 font-bold text-text-primary mb-3">
              We Fight Scams,
              <br />
              So You Don't Have To
            </h2>
            <p className="text-body text-text-secondary max-w-xl mx-auto">
              From AI detection to real-time monitoring, SafeNest has multiple
              layers of protection keeping your rental journey safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scamCards.map((card, index) => (
              <div
                key={index}
                className="border border-border rounded-xl p-5 hover:shadow-card transition-shadow"
              >
                <div className="w-10 h-10 bg-[#BDDAFF] rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-small font-semibold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-caption text-text-tertiary leading-relaxed mb-4">
                  {card.desc}
                </p>
                <a
                  href="#"
                  className="text-primary text-caption font-medium hover:underline flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <HiOutlineArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-secondary py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-h2 font-bold text-text-primary text-center mb-10">
            What People are Saying
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <t.avatar className="w-10 h-10 rounded-full text-primary" />
                  <div>
                    <p className="text-small font-semibold text-text-primary">
                      {t.name}
                    </p>
                    <p className="text-caption text-primary">{t.role}</p>
                    <p className="text-caption text-primary">{t.location}</p>
                  </div>
                </div>
                <p className="text-caption text-text-secondary leading-relaxed">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-h2 font-bold text-text-primary text-center mb-10">
            Frequently Asked Question
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-secondary py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-h2 font-bold text-text-primary mb-3">
            Still Have Questions?
          </h2>
          <p className="text-body text-text-secondary mb-8">
            Our support team is here to help you 24/7.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-small font-semibold hover:bg-primary-dark transition-colors">
            Contact Support
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
