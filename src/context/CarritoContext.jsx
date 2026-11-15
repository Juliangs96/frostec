import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()
export const useCarrito = () => useContext(CarritoContext)

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  // agrega el producto o suma la cantidad si ya estaba (sin pasar el stock)
  const agregar = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id)
      if (!existe) {
        return [...prev, { ...producto, cantidad: Math.min(cantidad, producto.stock) }]
      }
      return prev.map((i) =>
        i.id === producto.id ? { ...i, cantidad: Math.min(i.cantidad + cantidad, i.stock) } : i
      )
    })
  }

  const cambiarCantidad = (id, cantidad) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad: Math.max(1, Math.min(cantidad, i.stock)) } : i))
    )
  }

  const eliminar = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const vaciar = () => setItems([])

  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0)
  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{ items, agregar, cambiarCantidad, eliminar, vaciar, total, cantidadTotal }}
    >
      {children}
    </CarritoContext.Provider>
  )
}
