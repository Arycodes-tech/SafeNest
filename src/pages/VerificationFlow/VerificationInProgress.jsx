import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import identificationIcon from '../../assets/icons/IdentificationCard.svg'
import FlowPage from './FlowPage'

const steps = [
  { label: 'Profile Information', status: 'submitted' },
  { label: 'Documents Uploaded', status: 'under-review' },
  { label: 'Face Verification', status: 'under-review' },
  { label: 'Admin Review', status: 'under-review' },
  { label: 'Account Approval', status: 'completed' },
]

const statusConfig = {
  submitted: { label: 'Submitted', bg: 'bg-success', text: 'text-white' },
  'under-review': {
    label: 'Under Review',
    bg: 'bg-warning',
    text: 'text-white',
  },
  completed: { label: 'Completed', bg: 'bg-success', text: 'text-white' },
}

export default function VerificationInProgress() {
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
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF2FF]">
          <img
            src={identificationIcon}
            alt="Verification in progress"
            className="h-10 w-10"
          />
        </div>

        <h1 className="mb-1 text-h2 font-bold text-text-primary">
          Verification in Progress
        </h1>
        <p className="mb-6 text-small text-text-tertiary">
          We are reviewing your information.
          <br />
          You will be notified after review.
        </p>

        <div className="mb-6 w-full rounded-xl bg-primary px-4 py-4 text-center">
          <p className="text-xs text-blue-100">Estimated review time</p>
          <p className="text-base font-bold text-white">2 - 3 Business Days</p>
        </div>

        <div className="w-full rounded-2xl border border-border p-5">
          <h2 className="mb-4 text-sm font-bold text-text-primary">
            Your Progress
          </h2>
          <div className="grid gap-3">
            {steps.map(({ label, status }) => {
              const cfg = statusConfig[status]
              return (
                <div key={label} className="flex items-center justify-between">
                  <p className="text-sm text-text-secondary">{label}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}
                  >
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 w-full">
          <Button
            onClick={() => navigate('/dashboard')}
            size="large"
            className="w-full !rounded-xl !py-4"
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </FlowPage>
  )
}
