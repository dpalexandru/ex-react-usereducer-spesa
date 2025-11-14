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
    //Aggiungo campo quantity se non presente
    if (!p.quantity) {
      p = { ...p, quantity: 1 }
    }
    // controllo se esiste 
    const exists = addedProducts.some(item => item.name === p.name);

    if (exists) {
      //se asiste aumento la quantità di uno
      updateProductQuantity(p)
      return;
    }

    setAddedProducts([...addedProducts, p]);
  }

  // funzione per aumentare la quantità
  function updateProductQuantity(product) {
    setAddedProducts(prev =>
      prev.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // funzione per eliminare dal carrello 
  function removeFromCart(product) {
    setAddedProducts(prev =>
      prev.filter(item => item.name !== product.name)
    );
  }

  return (
    <>

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
      {addedProducts.length > 0 && (
        <div>
          <h2>Carrello</h2>
          {addedProducts.map((p, index) => (
            <div key={index}>
              <span>Nome: {p.name} — Prezzo: {p.price}€</span>
              <span> Quantità: {p.quantity}</span>
              <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
