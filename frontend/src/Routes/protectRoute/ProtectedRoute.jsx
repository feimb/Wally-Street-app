import { Outlet, Navigate } from 'react-router'
import  useAuth  from '../../hooks/useAuth'

export const ProtectedRoute = () => {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" />
}
