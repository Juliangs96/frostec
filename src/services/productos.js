import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const coleccion = collection(db, 'productos')

export const crearProducto = (datos) => addDoc(coleccion, datos)
export const editarProducto = (id, datos) => updateDoc(doc(db, 'productos', id), datos)
export const borrarProducto = (id) => deleteDoc(doc(db, 'productos', id))

// carga los productos de public/productos.json en Firestore (solo la primera vez)
export async function sembrarProductos() {
  const respuesta = await fetch('/productos.json')
  const lista = await respuesta.json()
  await Promise.all(lista.map(({ id, ...producto }) => addDoc(coleccion, producto)))
}
