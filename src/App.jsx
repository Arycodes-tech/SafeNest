import { Routes, Route } from 'react-router-dom'

import Landing from './pages/LandingPage/Landing'
import { LoginPage } from './pages/LoginPage/Login'
import { SignUpPage } from './pages/SignUpPage/SignUp'
import { RoleSelectionPage } from './pages/RoleSelectionPage/RoleSelection'
import { WelcomePage } from './pages/WelcomePage/Welcome'
import { VerifyOtpPage } from './pages/VerifyOtpPage/VerifyOtp'
import { VerifyEmailPage } from './pages/VerifyEmailPage/VerifyEmail'
import { PreferencesPage } from './pages/PreferencePage/Prefrences'
import { SuccessPage } from './pages/SucessPage/Success'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/role" element={<RoleSelectionPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
