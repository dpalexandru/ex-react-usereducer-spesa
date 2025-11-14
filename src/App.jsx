import { useState } from 'react'
import './App.css'

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  //stati 
  const [productsAll, setProducts] = useState(products)
  const [addedProducts, setAddedProducts] = useState([])

  //Funzione per aggiungere al carrello
  function addToCart(p) {
    setAddedProducts([...addedProducts, p]);
  }

  return (
    <>
      <div>
        <h2>Carrello</h2>
        {addedProducts.map((p, index) => {
          return (
            <p key={index}>{`Nome: `}{p.name}{` Prezzo: `}{p.price} </p>
          )
        })}
      </div>
      <div>
        <h2>Tutti Prodotti</h2>
        {productsAll.map((p, index) => {
          return (
            <div key={index}>
              <p>Nome: {p.name} — Prezzo: {p.price}€</p>
              <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
