import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Firebase avisa cuando el usuario entra o sale
  useEffect(() => {
    return onAuthStateChanged(auth, (usuario) => {
      setUser(usuario)
      setCargando(false)
    })
  }, [])

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const registro = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, cargando, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
