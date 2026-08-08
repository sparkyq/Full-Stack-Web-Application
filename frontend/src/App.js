import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analytics from "./pages/Analytics";
import Products from "./pages/Products";

function App() {
  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const products = [
   
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const username = localStorage.getItem("username");

  return (
    <BrowserRouter>
      <Navbar
        cartCount={cart.length}
        openCart={() => setIsCartOpen(true)}
        username={username}
      />


      <Routes>
        <Route
          path="/"
          element={
          <Home
            addToCart={addToCart}
          />
         }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
            path="/products"
            element={
              <Products
                addToCart={addToCart}
              />
            }
        />
      </Routes>

      {isCartOpen && (
        <CartSidebar
        cart={cart}
        setCart={setCart}
        closeCart={() =>
          setIsCartOpen(false)
        }
      />
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;