import { Routes, Route } from 'react-router-dom'
import Landing from './pages/LandingPage/Landing'
import { LoginPage } from './pages/LoginPage/Login'
import ForgotPassword from './components/layout/ForgotPassword'
import { SignUpPage } from './pages/SignUpPage/SignUp'
import { RoleSelectionPage } from './pages/RoleSelectionPage/RoleSelection'
import { WelcomePage } from './pages/WelcomePage/Welcome'
import { VerifyOtpPage } from './pages/VerifyOtpPage/VerifyOtp'
import { VerifyEmailPage } from './pages/VerifyEmailPage/VerifyEmail'
import { PreferencesPage } from './pages/PreferencePage/Preferences'
import { SuccessPage } from './pages/SucessPage/Success'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from './pages/ProfilePage/ProfilePage'
import RequestToRent from './pages/RequestToRent/RequestToRent'
import RequestToRentReview from './pages/RequestToRentReview/RequestToRentReview'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/role" element={<RoleSelectionPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/request-to-rent" element={<RequestToRent />} />
      <Route path="/request-to-rent/review" element={<RequestToRentReview />} />
    </Routes>
  )
}

export default App
