import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from './data/db';

function App() {

    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    function addToCart(){
        
    }

    return (
        <>
            <Header />
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
