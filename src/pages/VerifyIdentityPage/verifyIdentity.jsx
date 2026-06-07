import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export const VerifyIdentityPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center px-md py-xl">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-h2 font-bold text-text-primary mb-4">
          Verify Your Identity
        </h1>
        <p className="text-body text-text-secondary mb-8">
          To continue, please verify your identity by uploading your documents
          and confirming your details.
        </p>
        <div className="space-y-md">
          <p className="text-text-secondary">
            This is a placeholder page for identity verification. Replace this
            content with your verification form.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/signup')}
          >
            Continue to Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
