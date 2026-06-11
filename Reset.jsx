import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isDisabled =!email.trim() || isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) throw new Error('Request failed');
      setIsSuccess(true);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-6 pt-12 pb-8 bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      <div className="flex justify-center mb-8">
        <img 
          src="https://res.cloudinary.com/dlldm26g7/image/upload/v1780846615/ChatGPT_Image_May_27_2026_11_20_05_AM_1_mhv1ba.svg" 
          alt="Forgot password"
          className="w-full max-w-[240px] h-auto"
        />
      </div>

      {!isSuccess? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-3">Forgot Password?</h1>
            <p className="text-[#6B7280] text-[15px] leading-relaxed">
              Enter your email address and and we'll send<br />you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-[15px] font-semibold text-[#1A1A1A] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3.5 text-[15px] text-[#1A1A1A] placeholder-[#9CA3AF] focus:border-[#3B6FEF] focus:outline-none focus:ring-1 focus:ring-[#3B6FEF]"
              />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full rounded-lg px-4 py-4 text-white text-[16px] font-semibold transition-colors ${
                isDisabled 
                ? 'bg-[#D1D5DB] cursor-not-allowed' 
                  : 'bg-[#3B6FEF] hover:bg-[#2F5AD8]'
              }`}
            >
              {isSubmitting? 'Sending...' : 'Send reset link'}
            </button>

            <div className="text-center pt-2">
              <a href="/login" className="text-[#3B6FEF] text-[15px] font-semibold">
                Back to Sign in
              </a>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center pt-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DBEAFE] mb-4">
            <svg className="h-7 w-7 text-[#3B6FEF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Check your email</h3>
          <p className="text-[#6B7280] text-[15px] mb-6">
            We sent a reset link to <span className="font-semibold text-[#1A1A1A]">{email}</span>
          </p>
          <button 
            onClick={() => {
              setIsSuccess(false);
              setEmail('');
            }}
            className="text-[15px] font-semibold text-[#3B6FEF]"
          >
            Didn't receive it? Try again
          </button>
        </div>
      )}
    </div>
  );
}