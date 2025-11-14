import { useState } from 'react'
import './App.css'

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [productsAll, setProducts] = useState(products)

  return (
    <>
      <div>
        <h2>Carrello</h2>
      </div>
      <div>
        <h2>Tutti Prodotti</h2>
        {productsAll.map((p, index) => {
          return <p key={index}>{p.name}</p>
        })}
      </div>
    </>
  )
}

export default App
