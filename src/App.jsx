import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Ary's stuff - KEEP
import WelcomePage from './pages/welcomePage/welcome.jsx'
import DashboardPage from './pages/Dashboard/dashboard.jsx'
import RoleSelectionPage from './pages/RoleSelection/roleSelection.jsx'
import ResetPasswordPage from './pages/ResetPassword/reset.jsx'
import ForgetPassword from './components/layout/forgetPassword.jsx'

// Your stuff - KEEP
import Landing from './pages/LandingPage/Landing'
import LoginPage from './pages/LoginPage/Login'
import SignUpPage from './pages/SignUpPage/SignUp'
import VerifyOTPPage from './pages/VerifyOTPPage/VerifyOTP'
import VerifyEmailPage from './pages/VerifyEmailPage/VerifyEmail'
import PreferencesPage from './pages/PreferencePage/Preferences'
import SuccessPage from './pages/SucessPage/Success'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/role" element={<RoleSelectionPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
