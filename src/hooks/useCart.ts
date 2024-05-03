//los custom hooks siempre deben tener el use adelante
import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { Guitarra, CarItem } from '../types'


export const useCart = () => {
  

   const initialCart = () : CarItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  } //si local storage tiene algo va a setear ese valor sino va a retornar un arreglo vacio

  const [data ] = useState(db)
  const [cart, setCart] = useState<CarItem[]>(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))

  }, [cart])// cada vez que cart cambie quiero ejecutar lo siguiente que seria el renglon de arriba
  
  


  function addToCart(item: Guitarra) {

    //para saber si existe el elemento en el arreglo -1 cuando el elemento no esta en el carrito, si ya existe pone 1
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) {//existe en el carrito 
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]//crea una copia del carrito
      updatedCart[itemExists].quantity++
      setCart(updatedCart)//lo setea
    } else {
      const newItem : CarItem = {...item, quantity : 1}
      
      setCart( [...cart, newItem])
    }
   

  }

  function removeFromCart(id : number) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) //filtrame las guitarras cuyo id sea diferente al que te estoy pasando 
  }

  function increaseQuantity(id : number) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {//que se pueda agregar hasta 5 guitarras
        return {
          ...item, 
          quantity: item.quantity + 1
        }
      }
      return item 
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id: number) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {//que se pueda agregar hasta 5 guitarras
        return {
          ...item, 
          quantity: item.quantity -1
        }
      }
      return item 
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }
  // state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])// esta funcion va a revisar si el carrito tiene algo true si esta vacio false si tiene algo vuelve a ejecutar el codigo cada vez que carrito cambie o le quitemos elementos, este codigo se ejecuta cuando carrito haya sido modificado
  const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart])// el carrito inicia en 0 y hay que hacer cantidad por precio 

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart, 
    isEmpty,
    cartTotal

  }


//    return {
//     auth //las funciones o variables se colocan aca
//    }
}

