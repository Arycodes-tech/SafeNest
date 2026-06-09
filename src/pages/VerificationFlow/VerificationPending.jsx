import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import pendingIcon from '../../assets/icons/ShieldPlus.svg'
import FlowPage from './FlowPage'

export default function VerificationPending() {
  const navigate = useNavigate()

  return (
    <FlowPage className="text-center">
      <h1 className="mb-2 text-h2 font-bold text-text-primary">
        Verification Pending
      </h1>
      <p className="mb-10 text-small text-text-tertiary">
        Your documents are being reviewed. We will update you as soon as the
        check is complete.
      </p>

      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
        <img
          src={pendingIcon}
          alt="Pending verification"
          className="h-14 w-14"
        />
      </div>

      <p className="mb-10 text-sm font-semibold text-text-primary">
        Awaiting review
      </p>

      <div className="mt-auto w-full">
        <Button
          onClick={() => navigate('/verification/in-progress')}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Check Status
        </Button>
      </div>
    </FlowPage>
  )
}
