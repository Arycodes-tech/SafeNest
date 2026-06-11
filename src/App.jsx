import { Routes, Route } from 'react-router-dom'
import Landing from './pages/LandingPage/Landing'
import { LoginPage } from './pages/LoginPage/Login'
import { SignUpPage } from './pages/SignUpPage/SignUp'
import { RoleSelectionPage } from './pages/RoleSelectionPage/RoleSelection'
import { WelcomePage } from './pages/WelcomePage/Welcome'
import { VerifyOtpPage } from './pages/VerifyOtpPage/VerifyOtp'
import { VerifyEmailPage } from './pages/VerifyEmailPage/VerifyEmail'
import { PreferencesPage } from './pages/PreferencePage/Preferences'
import { SuccessPage } from './pages/SucessPage/Success'
import CompleteProfile from './pages/VerificationFlow/CompleteProfile'
import VerifyIdentity from './pages/VerificationFlow/VerifyIdentity'
import ReviewInfo from './pages/VerificationFlow/ReviewInfo'
import FaceVerification from './pages/VerificationFlow/FaceVerification'
import FaceSuccess from './pages/VerificationFlow/FaceSuccess'
import VerificationSubmitted from './pages/VerificationFlow/VerificationSubmitted'
import VerificationInProgress from './pages/VerificationFlow/VerificationInProgress'
import VerificationApproved from './pages/VerificationFlow/VerificationApproved'
import VerificationRejected from './pages/VerificationFlow/VerificationRejected'
import VerificationPending from './pages/VerificationFlow/VerificationPending'
import WelcomeLandlord from './pages/VerificationFlow/WelcomeLandlord'
import { HomePage } from './pages/HomePage/Home'
import VerifiedListings from './pages/VerifiedListingsPage/VerifiedListings'
import SavedListings from './pages/SavedListingsPage/SavedListings'

import { FilterPanel } from './pages/FilterPanelPage/FilterPanel'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/Reset'
import { BrowsePropertiesPage } from './pages/BrowsePropertiesPage/BrowseProperties'
import { PropertyDetailsPage } from './pages/BrowsePropertiespage/PropertyDetails'
import { RequestToRentPage } from './pages/BrowsePropertiespage/RequestToRent'
import { ReportScamPage } from './pages/ReportScamPage/ReportScam'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/role" element={<RoleSelectionPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/preferences" element={<PreferencesPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route
        path="/verification/complete-profile"
        element={<CompleteProfile />}
      />
      <Route
        path="/verification/verify-identity"
        element={<VerifyIdentity />}
      />
      <Route path="/verification/review-info" element={<ReviewInfo />} />
      <Route
        path="/verification/face-verification"
        element={<FaceVerification />}
      />
      <Route path="/verification/face-success" element={<FaceSuccess />} />
      <Route
        path="/verification/submitted"
        element={<VerificationSubmitted />}
      />
      <Route
        path="/verification/in-progress"
        element={<VerificationInProgress />}
      />
      <Route path="/verification/approved" element={<VerificationApproved />} />
      <Route path="/verification/rejected" element={<VerificationRejected />} />
      <Route path="/verification/pending" element={<VerificationPending />} />
      <Route path="/verification/welcome" element={<WelcomeLandlord />} />
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  )
}

export default App
