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
      // trovo il prodotto attuale nel carrello
      const current = addedProducts.find(item => item.name === p.name);
      // aumento la quantità di 1 usando la stessa funzione
      updateProductQuantity(p, current.quantity + 1);
      return;
    }

    setAddedProducts([...addedProducts, p]);
  }

  // funzione per aumentare la quantità
  function updateProductQuantity(product, newQuantity) {
    let quantity = parseInt(newQuantity, 10);

    // riporto a 1 se NaN o < 1
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }

    setAddedProducts(prev =>
      prev.map(item =>
        item.name === product.name
          ? { ...item, quantity }
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

  //funzione calcolo totale
  const Totale = (arr) => {
    const totale = arr.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
    return totale.toFixed(2);
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

              <span> Quantità:     <input
                type="number"
                min="0"
                value={p.quantity}
                onChange={(e) =>
                  updateProductQuantity(p, e.target.value)
                } /></span>

              <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
            </div>
          ))}
          <p>Totale prodotti nel carrello: {Totale(addedProducts)}€</p>

        </div>
      )}
    </>
  )
}

export default App
