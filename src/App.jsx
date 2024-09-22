import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/template/HomePage";
import Layout from "./layouts/Layout";
import Account from "./components/modules/Account";
import NotFoundPage from "./components/template/404";
import AboutUs from "./components/template/AboutUs";
import Articles from "./components/template/Articles";
import Trems from "./components/template/Trems";
import Store from "./components/template/Store";
import Products from "./components/template/Products";
import ContactUs from "./components/template/ContactUs";
import ShoppingCart from "./components/template/ShoppingCart";

function App() {
  const [productCart, setProductCart] = useState([]);
  return (
    <BrowserRouter>
      <Layout productCart={productCart}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/terms-and-conditions" element={<Trems />} />
          <Route
            path="/products"
            element={
              <Products
                productCart={productCart}
                setProductCart={setProductCart}
              />
            }
          />
          <Route path="/contact-us" from element={<ContactUs />} />
          <Route
            path="/shopping-cart"
            element={<ShoppingCart productCart={productCart} setProductCartLayout={setProductCart} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
