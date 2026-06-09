import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { FaCamera, FaEyeSlash, FaSun, FaUserCheck } from 'react-icons/fa'
import faceFrameIllustration from '../../assets/Frame.svg'
import FlowPage from './FlowPage'

export default function FaceVerification() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [step, setStep] = useState('instructions')

  const handleCapture = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPhoto(url)
      setStep('done')
    }
  }

  const handleStartVerification = () => {
    setStep('capture')
    setTimeout(() => fileInputRef.current?.click(), 100)
  }

  const handleTakeSelfie = () => {
    fileInputRef.current?.click()
  }

  const handleContinue = () => {
    if (!photo) return
    navigate('/verification/face-success')
  }

  if (step === 'instructions') {
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

        <div className="mb-8 text-center">
          <h1 className="text-h2 font-bold text-text-primary">
            Face Verification
          </h1>
          <p className="mt-1 text-small text-primary">
            We need to verify it's you.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-border bg-grey-200 p-4">
            <img
              src={faceFrameIllustration}
              alt="Face verification frame"
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20" />
          </div>
        </div>

        <div className="mb-8 grid gap-4">
          {[
            {
              icon: <FaUserCheck className="text-primary" />,
              text: 'Make sure your face is clearly visible',
            },
            {
              icon: <FaSun className="text-primary" />,
              text: 'Use a well-lit area',
            },
            {
              icon: <FaEyeSlash className="text-primary" />,
              text: "Don't wear sunglasses or a hat",
            },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-xl border border-border bg-grey-50 px-3 py-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                {icon}
              </div>
              <p className="text-sm text-text-secondary">{text}</p>
            </div>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleCapture}
        />

        <Button
          onClick={handleStartVerification}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Start Verification
        </Button>
      </FlowPage>
    )
  }

  if (step === 'capture') {
    return (
      <FlowPage>
        <div className="mb-8 text-center">
          <h1 className="text-h2 font-bold text-text-primary">
            Face Verification
          </h1>
          <p className="mt-2 text-small text-text-secondary">
            Position your face within the frame and keep the lighting clear.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            onClick={handleTakeSelfie}
            className="flex h-56 w-56 items-center justify-center rounded-full border-2 border-border bg-grey-200 transition-colors hover:border-primary"
          >
            <FaCamera size={36} className="text-text-tertiary" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleCapture}
        />

        <Button
          onClick={handleTakeSelfie}
          size="large"
          className="w-full !rounded-xl !py-4"
        >
          Take a Selfie
        </Button>
      </FlowPage>
    )
  }

  return (
    <FlowPage>
      <div className="mb-8 text-center">
        <h1 className="text-h2 font-bold text-text-primary">Selfie Ready</h1>
        <p className="mt-2 text-small text-text-secondary">
          Review the photo and continue to finish verification.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="h-64 w-64 overflow-hidden rounded-[2rem] border border-border bg-grey-200 shadow-floating">
          {photo ? (
            <img
              src={photo}
              alt="Captured selfie"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center" />
          )}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        size="large"
        className="w-full !rounded-xl !py-4"
      >
        Continue
      </Button>
    </FlowPage>
  )
}
