import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/template/HomePage";
import Layout from "./layouts/Layout";
import Account from "./components/modules/Account";
import ShoppingCard from "./components/modules/ShoppingCard";
import NotFoundPage from "./components/template/404";
import AboutUs from "./components/template/AboutUs";
import Articles from "./components/template/Articles";
import Trems from "./components/template/Trems";
import Store from "./components/template/Store";
import Products from "./components/template/Products"
import ContactUs from "./components/template/ContactUs"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shopping-card" element={<ShoppingCard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/terms-and-conditions" element={<Trems />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact-us" from element={<ContactUs />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
