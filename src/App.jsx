import { Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import { LoginPage } from './pages/Login'
import { SignUpPage } from './pages/SignUp'
import { RoleSelectionPage } from './pages/RoleSelection'
import { WelcomePage } from './pages/Welcome'
import { VerifyOtpPage } from './pages/VerifyOtpPage'
import { VerifyEmailPage } from './pages/VerifyEmailPage'

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
    </Routes>
  )
}

export default App
