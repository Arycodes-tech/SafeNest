import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import shieldCheckIcon from '../../assets/icons/ShieldCheck.svg'
import FlowPage from './FlowPage'

const steps = [
  'Profile Information',
  'Documents Uploaded',
  'Face Verification',
  'Admin Review',
  'Account Approval',
]

export default function VerificationApproved() {
  const navigate = useNavigate()

  return (
    <FlowPage>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-text-secondary transition-colors hover:text-primary"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <img
            src={shieldCheckIcon}
            alt="Approved verification"
            className="h-10 w-10"
          />
        </div>

        <h1 className="mb-2 text-h2 font-bold text-text-primary">
          Congratulations
        </h1>
        <p className="mb-8 text-small text-text-tertiary">
          Your account has been approved and verified.
        </p>

        <div className="w-full rounded-2xl border border-border p-5">
          <h2 className="mb-4 text-sm font-bold text-text-primary">
            What you can do now
          </h2>
          <div className="grid gap-3">
            {steps.map((step) => (
              <div key={step} className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">{step}</p>
                <span className="rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full">
          <Button
            onClick={() => navigate('/verification/welcome')}
            size="large"
            className="w-full !rounded-xl !py-4"
          >
            Continue
          </Button>
        </div>
      </div>
    </FlowPage>
  )
}
