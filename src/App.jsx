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
import Profile from './pages/ProfilePage/ProfilePage'
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
import ResetPassword from './pages/Reset'
import { BrowsePropertiesPage } from './pages/BrowsePropertiespage/BrowseProperties'
import { PropertyDetailsPage } from './pages/BrowsePropertiespage/PropertyDetails'
import { RequestToRentPage } from './pages/BrowsePropertiespage/RequestToRent'
import { ReportScamPage } from './pages/ReportScamPage/ReportScam'
import { NotificationPage } from './pages/HomePage/NotificationPage'
import { Dashboard } from './pages/landlorddashboard'
import { VerifyPropertyOwnership } from './pages/VerifyPropertiesListing'
import { MessagesList } from './pages/chatscreen'
import { ChatConversation } from './pages/ChatConversation'
import { ProfilePage } from './pages/ProfilePage/LandordProfile'
import RenterProfilePage from './pages/ProfilePage/ProfilePage'
import ReviewAndSubmitPage from './pages/BrowsePropertiespage/RequestToRentReview'

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
      <Route path="/request-to-rent/review" element={<ReviewAndSubmitPage />} />

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
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/filter" element={<FilterPanel />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/reset/password" element={<ResetPassword />} />
      <Route path="/browse/properties" element={<BrowsePropertiesPage />} />
      <Route path="/listing/:id" element={<PropertyDetailsPage />} />
      <Route path="/request-to-rent/:id" element={<RequestToRentPage />} />
      <Route path="/report-scam" element={<ReportScamPage />} />
      <Route path="/verified-listings" element={<VerifiedListings />} />
      <Route path="/saved" element={<SavedListings />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/verify-property" element={<VerifyPropertyOwnership />} />
      <Route path="/messages" element={<MessagesList />} />
      <Route path="/messages/:id" element={<ChatConversation />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/renter/profile" element={<RenterProfilePage />} />
      <Route path="/review/submit" element={<ReviewAndSubmitPage />} />
    </Routes>
  )
}
export default App
