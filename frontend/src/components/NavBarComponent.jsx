// src/components/NavBarComponent.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const NavBarComponent = () => {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `text-sm px-3 py-1.5 rounded transition-colors ${
      isActive
        ? 'text-primary font-semibold bg-primary-950'
        : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
    }`

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 px-8 py-3 sticky top-0">
      {token ? (
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-white">
            Hola, {user?.username}
          </span>
          <span className="text-sm text-neutral-400 mr-2">
            Portfolio: <span className="text-primary font-medium">${user?.portfolio_value ?? '0.00'}</span>
          </span>

          <NavLink to="/portfolio"   className={linkClass}>Mi portfolio</NavLink>
          <NavLink to="/operaciones" className={linkClass}>Mis operaciones</NavLink>
          <NavLink to="/panel"       className={linkClass}>Ver panel</NavLink>
          <NavLink to="/editar"      className={linkClass}>Editar usuario</NavLink>

          {user?.role === 'admin' && (
            <NavLink to="/usuarios" className={linkClass}>
              <span className="text-yellow-400 font-semibold">Manejo usuarios</span>
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="ml-auto text-sm px-4 py-1.5 rounded bg-tertiary hover:bg-tertiary-600 text-white font-medium transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <NavLink
            to="/registro"
            className="text-sm px-4 py-1.5 rounded border border-primary text-primary hover:bg-primary-950 transition-colors"
          >
            Registro
          </NavLink>
          <NavLink
            to="/login"
            className="text-sm px-4 py-1.5 rounded bg-primary hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  )
}