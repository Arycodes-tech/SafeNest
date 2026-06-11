import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import shieldIcon from '../../assets/icons/ShieldCheck.svg'
import FlowPage from './FlowPage'

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary">{title}</h3>
        <button
          onClick={onEdit}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-[#EEF2FF] px-4 py-4">
        <div className="pointer-events-none absolute bottom-2 right-3 opacity-10">
          <img src={shieldIcon} alt="" className="h-16 w-16" />
        </div>
        {children}
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="text-xs text-text-tertiary">{label}</p>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </div>
  )
}

export default function ReviewInfo() {
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/verification/face-verification')
  }

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

      <div className="mb-6">
        <h1 className="text-h2 font-bold text-text-primary">
          Review Your Information
        </h1>
        <p className="mt-1 text-center text-small text-primary">
          Please confirm your details before submitting.
        </p>
      </div>

      <ReviewSection
        title="Account Information"
        onEdit={() => navigate('/verification/complete-profile')}
      >
        <InfoRow label="Name" value="Olawale Alade Karunwi" />
        <InfoRow
          label="Phone"
          value={
            <span className="flex items-center gap-1">
              <span className="text-base">🇳🇬</span> +234 812 278 2914
            </span>
          }
        />
        <InfoRow label="Email" value="aladekarunwi@gmail.com" />
      </ReviewSection>

      <ReviewSection
        title="Property Verification"
        onEdit={() => navigate('/verification/complete-profile')}
      >
        <InfoRow
          label="Property Address"
          value="12, Freedom way, Lekki Phase 1"
        />
        <InfoRow label="Status" value="Submitted" />
      </ReviewSection>

      <ReviewSection
        title="Identity Verification"
        onEdit={() => navigate('/verification/verify-identity')}
      >
        <InfoRow label="ID Type" value="National ID Card" />
        <InfoRow label="Status" value="Submitted" />
      </ReviewSection>

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Submit Application
        </Button>
      </div>
    </FlowPage>
  )
}
