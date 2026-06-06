import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WelcomePage } from './pages/WelcomePage/welcome.jsx'
import { LoginPage } from './pages/Login/login.jsx'
import { RoleSelectionPage } from './pages/RoleSelection/roleSelection.jsx'
import { SignUpPage } from './pages/SignUp/signUp.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/role" element={<RoleSelectionPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
