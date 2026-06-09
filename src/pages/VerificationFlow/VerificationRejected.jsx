import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import shieldSlashIcon from '../../assets/icons/ShieldSlash.svg'
import FlowPage from './FlowPage'

export default function VerificationRejected() {
  const navigate = useNavigate()

  return (
    <FlowPage className="text-center">
      <h1 className="mb-2 text-h2 font-bold text-text-primary">
        Verification Rejected
      </h1>
      <p className="mb-10 text-small text-text-tertiary">
        Your verification was unsuccessful. Please review the reason below and
        resubmit the correct documents for approval.
      </p>

      <div className="mb-4 flex h-24 w-24 items-center justify-center">
        <img
          src={shieldSlashIcon}
          alt="Verification rejected"
          className="h-20 w-20"
        />
      </div>

      <p className="mb-10 text-sm font-semibold text-text-primary">
        Verification Failed
      </p>

      <div className="mt-auto w-full">
        <Button
          onClick={() => navigate('/verification/verify-identity')}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Resubmit Documents
        </Button>
      </div>
    </FlowPage>
  )
}
