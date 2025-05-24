// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload.id;
      if (!state.items[id]) {
        state.items[id] = { ...action.payload, quantity: 1 };
      }
    },
    increment: (state, action) => {
      state.items[action.payload].quantity++;
    },
    decrement: (state, action) => {
      if (state.items[action.payload].quantity > 1) {
        state.items[action.payload].quantity--;
      } else {
        delete state.items[action.payload];
      }
    },
    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, increment, decrement, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Next Steps: Implement LandingPage, ProductListingPage, CartPage, Header, and plant data.
