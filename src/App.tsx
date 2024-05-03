
import Header from "./Components/Header"
import Guitarra from "./Components/Guitarra"

import { useCart } from "./hooks/useCart"

function App() {

  // const { auth } = useCart()// y se acceden desde aca
  // console.log(auth)

  const { data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart()

  

  

  
  // const [auth, setAuth] = useState(false)


  // //Effect
  // useEffect(() => {
  //   if(auth) {

  //   console.log('autemticado')
  //   }
  // }, [auth])

  // setTimeout(() => {
  //   setAuth(true)
  // }, 3000);

  //State
  // const [auth, setAuth] = useState([])//true para autenticado false para no autenticado
  // const [total, setTotal] = useState(0)
  // const [cart, setCart] = useState([])
  //los hooks no se pueden tener de forma condicional digamos en un if, fuera de una funcion y arriba de todo 


    return (
    <>
      
     <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      isEmpty={ isEmpty }
      cartTotal={cartTotal}
     
     />
     
 

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
         {data.map((guitar) => (
         <Guitarra
          key={guitar.id} //siempre hay que pasarle a los props un key que sea un valor unico por eso el id
          guitar={guitar}
          
          
          addToCart={addToCart}
         />
         
         ))}
         
           

           
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
