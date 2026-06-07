import { useState } from 'react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isButtonDisabled = !email || !isValidEmail || isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col px-6 pt-12 pb-8 max-w-sm mx-auto">
        <div className="flex justify-center mb-8 mt-4">
          <img
            src="https://res.cloudinary.com/dlldm26g7/image/upload/v1780846615/ChatGPT_Image_May_27_2026_11_20_05_AM_1_mhv1ba.svg"
            alt="Forgot Password Illustration"
            className="w-64 h-48 object-contain"
          />
        </div>

        {!isSuccess ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
              Enter your email address and we'll send you a link to reset your
              password
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                  placeholder="Enter your email address"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full rounded-xl px-4 py-4 text-white font-semibold text-base transition-colors ${
                  isButtonDisabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>

            <div className="text-center mt-6">
              <a
                href="/login"
                className="text-blue-600 font-semibold text-base"
              >
                Back to Sign in
              </a>
            </div>
          </>
        ) : (
          <div className="text-center mt-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Check your email
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              We sent a reset link to{' '}
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
            <button
              onClick={() => {
                setIsSuccess(false)
                setEmail('')
              }}
              className="text-sm font-medium text-gray-600 hover:text-gray-500"
            >
              Didn't receive it? Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
