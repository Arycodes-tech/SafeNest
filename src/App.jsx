import { Alert } from './components/ui/Alert'
import { Badge } from './components/ui/Badge'
import { Button } from './components/ui/Button'
import { ChatBubble } from './components/ui/ChatBubble'
import { DepositCard } from './components/ui/DepositCard'
import { EmptyState } from './components/ui/EmptyState'
import { Input } from './components/ui/Input'
import { PaymentStatusCard } from './components/ui/PaymentStatusCard'
import { Select } from './components/ui/Select'
import { BottomNavigation } from './components/layout/BottomNavigation'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { PropertyCard } from './components/property/PropertyCard'
import { PropertyGallery } from './components/property/PropertyGallery'
import { FilterChips } from './components/ui/FilterChips'

const locationOptions = [
  { label: 'Yaba, Lagos', value: 'yaba' },
  { label: 'Lekki, Lagos', value: 'lekki' },
  { label: 'Ikeja, Lagos', value: 'ikeja' },
]

function App() {
  return (
    <div className="min-h-screen bg-background-secondary font-sans text-text-primary">
      <Navbar />

      <main className="grid gap-6 p-4 sm:p-6 lg:p-8">
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="text">Text Button</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Inputs and Filters</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="Search" placeholder="Search location, estate etc" />
            <Select
              label="Location"
              placeholder="Choose location"
              options={locationOptions}
            />
            <Input
              label="Error"
              placeholder="Search location"
              error="Please enter your location"
            />
            <Select
              label="Dropdown Error"
              placeholder="Choose location"
              options={locationOptions}
              error="Please select a location"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Filter Chips</h2>
          <FilterChips />
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Alerts and Badges</h2>
          <div className="grid gap-4">
            <Alert type="success" message="Deposit successful!" />
            <Alert type="info" message="Your request has been processed" />
            <Alert type="warning" message="This listing is under review" />
            <Alert type="error" message="Payment failed. Please try again" />

            <div className="flex flex-wrap gap-3">
              <Badge type="verified">Verified Property</Badge>
              <Badge type="verified">Verified Agent</Badge>
              <Badge type="info">ID Verified</Badge>
              <Badge type="pending">Under Review</Badge>
              <Badge type="rejected">Not Verified</Badge>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Cards</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <PropertyCard />
            <DepositCard />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Payment Status</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <PaymentStatusCard
              status="pending"
              title="Pending"
              description="Deposit not paid yet"
            />
            <PaymentStatusCard
              status="held"
              title="Held"
              description="Funds held securely"
            />
            <PaymentStatusCard
              status="released"
              title="Released"
              description="Deposit released"
            />
            <PaymentStatusCard
              status="refunded"
              title="Refunded"
              description="Deposit refunded"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">Chat and Empty States</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid gap-3">
              <ChatBubble
                sender="agent"
                message="Hello! is this apartment still available?"
                time="10:32 AM"
              />
              <ChatBubble
                sender="user"
                message="Yes, it is still available"
                time="10:35 AM"
              />
            </div>

            <EmptyState
              title="No properties found"
              description="Try adjusting your filters or search another location."
              buttonText="Clear Filters"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-[18px] mt-0 text-h3">
            Gallery and Mobile Navigation
          </h2>
          <div className="grid gap-6">
            <PropertyGallery />
            <BottomNavigation />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
