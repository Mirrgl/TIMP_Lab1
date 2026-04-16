import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from './fakeauth' 

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}