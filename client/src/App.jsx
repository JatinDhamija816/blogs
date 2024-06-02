import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { UserProvider } from "./contexts/UserContext"
import PublicRoute from './Routes/PublicRoute'
import ProtectedRoute from './Routes/ProtectedRoute'
import InitialPage from './InitialPage'
import Auth from "./components/Auth/Auth"
import Profile from "./components/Profile/Profile"
import Blog from "./components/Blog/Blog"
import { BlogProvider } from "./contexts/BlogContext"


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BlogProvider>
          <Routes>
            <Route path="/" element={<PublicRoute><InitialPage /></PublicRoute>} />
            <Route path="/home/*" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            <Route path="/profile/*" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
          <Auth />
        </BlogProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App