import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import RutaPrivada from './components/RutaPrivada'
import Home from './pages/Home'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<RutaPrivada><Admin /></RutaPrivada>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
