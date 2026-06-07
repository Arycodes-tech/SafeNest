import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Landing Page/Landing.jsx'
import { WelcomePage } from './pages/WelcomePage/welcome.jsx'
import { LoginPage } from './pages/Login/login.jsx'
import { RoleSelectionPage } from './pages/RoleSelection/roleSelection.jsx'
import { SignUpPage } from './pages/SignUp/signUp.jsx'
import { VerifyIdentityPage } from './pages/VerifyIdentityPage/verifyIdentity.jsx'
import DashboardPage from './pages/Dashboard/dashboard.jsx'
import ResetPasswordPage from './pages/ResetPassword/reset.jsx'
import ForgotPassword from './components/layout/ForgotPassword.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/role" element={<RoleSelectionPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-identity" element={<VerifyIdentityPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
