import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import shieldCheckIcon from '../../assets/icons/ShieldCheck.svg'
import FlowPage from './FlowPage'

export default function VerificationSubmitted() {
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
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success">
          <img src={shieldCheckIcon} alt="Shield check" className="h-10 w-10" />
        </div>

        <h1 className="mb-2 text-h2 font-bold text-text-primary">
          Verification Submitted
        </h1>
        <p className="mb-8 text-small text-text-tertiary">
          Thank you! Your landlord account is being reviewed.
        </p>

        <div className="w-full rounded-2xl border border-border p-5 text-left">
          <h2 className="mb-4 text-sm font-bold text-text-primary">
            What happens next?
          </h2>
          <div className="grid gap-3">
            {[
              'Your documents will be verified by our team',
              "We'll review the information you submitted",
              "You'll receive a notification once your approval is confirmed",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mt-0.5 shrink-0"
                >
                  <path
                    d="M5 12l5 5L19 7"
                    stroke="#2B4CDC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full">
          <Button
            onClick={() => navigate('/verification/in-progress')}
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
