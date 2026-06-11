import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import landlordIllustration from '../../assets/images/LandLord.svg'
import FlowPage from './FlowPage'

const permissions = [
  'Create and publish listings',
  'Chat with verified Agents & Renters',
  'Manage properties & availability',
  'Receive & manage payments',
]

export default function WelcomeLandlord() {
  const navigate = useNavigate()
  const userName = 'Olawale'

  return (
    <FlowPage>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-blue-50 p-4">
          <img
            src={landlordIllustration}
            alt="Verified landlord illustration"
            className="h-full w-full object-contain"
          />
        </div>

        <h1 className="mb-2 text-h2 font-bold text-text-primary">
          Welcome to SafeNest,
          <br />
          {userName}
        </h1>
        <p className="mb-8 max-w-xs text-small text-text-tertiary">
          You are now a verified landlord. You can now connect with agents and
          chat with renters.
        </p>

        <div className="mb-6 flex w-full items-center gap-4 rounded-2xl border border-border px-4 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2L3 7v5c0 5.25 3.75 10.1 9 11.25C17.25 22.1 21 17.25 21 12V7L12 2z"
                fill="white"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="#2B4CDC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-text-primary">
              Verified Landlord
            </p>
            <p className="text-xs text-text-tertiary">
              Your profile is verified
            </p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-border p-5">
          <h2 className="mb-4 text-sm font-bold text-text-primary">
            You have access to
          </h2>
          <div className="grid gap-3">
            {permissions.map((perm) => (
              <div
                key={perm}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-sm text-text-secondary">{perm}</p>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Granted
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full">
          <Button
            onClick={() => navigate('/dashboard')}
            size="large"
            className="w-full !rounded-xl !py-4"
          >
            Let's Get Started
          </Button>
        </div>
      </div>
    </FlowPage>
  )
}
