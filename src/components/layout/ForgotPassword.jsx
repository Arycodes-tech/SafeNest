function ForgotPassword() {
  return (
    <div className="bg-[#F8F9FC] min-h-screen flex justify-center">
      <div className="w-full max-w-md px-6 pt-10 text-center">
        <img
          src="https://res.cloudinary.com/dipj4wvno/image/upload/q_auto/f_auto/v1780790947/ChatGPT_Image_May_27_2026_11_20_05_AM_1_fnuvwt.svg"
          alt="Forgot Password"
          className="w-72 mx-auto mb-8"
        />

        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Forgot Password?
        </h1>

        <p className="text-gray-500 mb-10 leading-relaxed">
          Enter your email address and we'll send you a link to reset your
          password
        </p>

        <form className="text-left">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-800 mb-3"
          >
            Email Address
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-4 border border-gray-300 rounded-lg mb-8
                      focus:outline-none focus:ring-2 focus:ring-[#2F45D3]"
          />

          <button
            type="submit"
            className="w-full bg-[#2F45D3] hover:bg-[#2437B7]
                      text-white py-4 rounded-lg font-semibold transition"
          >
            Send reset link
          </button>
        </form>

        <a
          href="/login"
          className="inline-block mt-8 text-[#2F45D3] font-semibold"
        >
          Back to Sign In
        </a>
      </div>
    </div>
  );
}

export default ForgotPassword;