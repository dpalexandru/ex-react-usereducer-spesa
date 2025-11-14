import { useState, useReducer } from 'react'
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
  const [cart, dispatch] = useReducer(cartReducer, []);



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

      case 'REMOVE_ITEM': {
        const product = action.payload;
        return state.filter(p => p.name !== product.name);

      }
      case 'UPDATE_QUANTITY': {
        const { product, quantity } = action.payload;

        let q = parseInt(quantity, 10);
        if (isNaN(q) || q < 1) {
          q = 1;
        }

        return state.map(item =>
          item.name === product.name
            ? { ...item, quantity: q }
            : item
        );
      }
      default:
        return state;
    }
  }

  function updateProductQuantity(product, newQuantity) {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        product,
        quantity: newQuantity,
      },
    });
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

              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_ITEM', payload: p })
                }

              >Rimuovi dal carrello</button>
            </div>
          ))}
          <p>Totale prodotti nel carrello: {Totale(cart)}€</p>

        </div>
      )}
    </>
  )
}

export default App
