import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const mensajes = {
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ese email ya está registrado.',
  'auth/weak-password': 'La contraseña tiene que tener al menos 6 caracteres.',
  'auth/invalid-email': 'El email no es válido.',
}

function Login() {
  const { user, login, registro } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [esRegistro, setEsRegistro] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const destino = location.state?.from?.pathname || '/admin'

  // si ya está logueado no tiene sentido mostrar el formulario
  if (user) return <Navigate to={destino} replace />

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      if (esRegistro) await registro(email, password)
      else await login(email, password)
      navigate(destino, { replace: true })
    } catch (err) {
      setError(mensajes[err.code] || 'No pudimos completar la operación. Probá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Container className="py-5" style={{ maxWidth: 440 }}>
      <Helmet>
        <title>{esRegistro ? 'Registrarse' : 'Ingresar'} | Frostec Refrigeración</title>
        <meta name="description" content="Accedé al panel de gestión de Frostec." />
      </Helmet>
      <Card body>
        <h2 className="h4 mb-3">{esRegistro ? 'Crear cuenta' : 'Ingresar'}</h2>
        <Form onSubmit={enviar}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" className="w-100" disabled={enviando}>
            {enviando ? <Spinner size="sm" animation="border" /> : esRegistro ? <FaUserPlus /> : <FaSignInAlt />}{' '}
            {esRegistro ? 'Registrarme' : 'Ingresar'}
          </Button>
        </Form>
        <Button variant="link" className="mt-2 p-0" onClick={() => { setEsRegistro(!esRegistro); setError('') }}>
          {esRegistro ? 'Ya tengo cuenta, quiero ingresar' : 'No tengo cuenta, quiero registrarme'}
        </Button>
      </Card>
    </Container>
  )
}

export default Login
