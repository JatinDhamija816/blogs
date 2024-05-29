import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { UserProvider } from "./contexts/UserContext"
import PublicRoute from './Routes/PublicRoute'
import ProtectedRoute from './Routes/ProtectedRoute'
import InitialPage from './InitialPage'
import Auth from "./components/Auth/Auth"
import BlogHome from "./components/Blog/BlogHome"
import Profile from "./components/Profile/Profile"


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<PublicRoute><InitialPage /></PublicRoute>} />
          <Route path="/home" element={<ProtectedRoute><BlogHome /></ProtectedRoute>} />
          <Route path="/profile/*" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
        <Auth />
      </UserProvider>
    </AuthProvider>
  )
}

export default App