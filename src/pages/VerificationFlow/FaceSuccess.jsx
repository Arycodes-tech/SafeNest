import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import avatarPlaceholder from '../../assets/icons/UserCheck.svg'
import FlowPage from './FlowPage'

export default function FaceSuccess() {
  const navigate = useNavigate()

  return (
    <FlowPage className="text-center">
      <h1 className="mb-2 text-h2 font-bold text-text-primary">
        Verification Complete
      </h1>
      <p className="mb-10 text-small text-text-tertiary">
        Your face has been verified successfully. Tap continue to proceed.
      </p>

      <div className="mb-4 flex flex-col items-center gap-3">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-grey-200">
          <img
            src={avatarPlaceholder}
            alt="Verified profile"
            className="h-12 w-12"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success">
            <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-text-primary">
            Face Verification Successful
          </p>
        </div>
      </div>

      <div className="mt-10 w-full">
        <Button
          onClick={() => navigate('/verification/submitted')}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Continue
        </Button>
      </div>
    </FlowPage>
  )
}
