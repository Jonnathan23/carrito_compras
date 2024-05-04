import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from './data/db';

function App() {
    
    const inicialCart = ()=>{
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart): [];
    }
    
    const [data] = useState(db);
    const [cart, setCart] = useState(inicialCart);
    const maxGuitars = 5
    const minGuitars = 1
    
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    function addToCart(item) {

        const itemExists = cart.findIndex(searchGuitar => searchGuitar.id === item.id);
        console.log(itemExists)
        if (itemExists == -1) {
            item.quantity = 1
            setCart([...cart, item])
            console.log(`Agregando item ${item.name}`)
        } else {            
            if (cart[itemExists].quantity === maxGuitars)  return
            const updateItemn = [...cart]
            updateItemn[itemExists].quantity++
            setCart(updateItemn)
        }       

    }

    function removeGuitarCart(id) {
        setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id))
    }

    function increaseGuitar(id) {
        console.log(`Incrementando ${id}`)
        /*const index = cart.findIndex(searchGuitar => searchGuitar.id === id) //indice
        const incrementGuitar = [...cart]
        incrementGuitar[index].quantity++
        */
        const incrementGuitar = cart.map(item => {
            (item.id === id && item.quantity <= maxGuitars) && item.quantity++
            return item
        })
        setCart(incrementGuitar)
    }

    function decreaseGuitar(id) {
        const decrementGuitar = cart.map(item => {
            (item.id === id && item.quantity > minGuitars) && item.quantity--
            return item
        })
        setCart(decrementGuitar)

    }

    function removeCart(){   
        setCart([])
    }


    return (
        <>
            <Header
                cart={cart}
                removeGuitarCart={removeGuitarCart}
                increaseGuitar={increaseGuitar}
                decreaseGuitar={decreaseGuitar}
                removeCart={removeCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {// Para mostrar el componente el numero de veces segun nuestra base de datos
                        //? Para la funcion map es necesario el return o poner todo dentro de un paréntesis
                    }
                    {data.map((guitar) => (
                        // Implementación de Props
                        <Guitar
                            key={guitar.id}  //--> LLave de identificador
                            guitar={guitar}
                            setCart={setCart} // Pasando el statement del carrito
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
