import { useState, useReducer } from 'react'
import './App.css'

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];


  // R E D U C E R 


  function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_ITEM': {
        const product = action.payload;

        // Se il prodotto è già nel carrello
        const exists = state.some(item => item.name === product.name);

        if (exists) {
          // Aumento la quantity di 1
          return state.map(item =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        // Se non ha quantity, la imposto a 1
        const productWithQuantity = product.quantity
          ? product
          : { ...product, quantity: 1 };

        // Ritorno un nuovo array con il nuovo prodotto aggiunto
        return [...state, productWithQuantity];
      }

      case 'REMOVE_ITEM':
        // Logica per rimuovere un prodotto 
        return state;

      case 'UPDATE_QUANTITY':
        // Logica per aggiornare la quantità 
        return state;

      default:
        return state;
    }
  }


  //stati 
  const [productsAll, setProducts] = useState(products)
  const [cart, dispatch] = useReducer(cartReducer, []);


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
              <button onClick={() =>
                dispatch({ type: 'ADD_ITEM', payload: p })
              }
              >Aggiungi al carrello</button>
            </div>
          )
        })}
      </div>
      {cart.length > 0 && (
        <div>
          <h2>Carrello</h2>
          {cart.map((p, index) => (
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
          <p>Totale prodotti nel carrello: {Totale(cart)}€</p>

        </div>
      )}
    </>
  )
}

export default App
