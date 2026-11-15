import { Navigate, useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

function RutaPrivada({ children }) {
  const { user, cargando } = useAuth()
  const location = useLocation()

  if (cargando) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    )
  }

  // si no hay usuario, lo mando al login y recuerdo a dónde quería ir
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default RutaPrivada
