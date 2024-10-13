import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/template/HomePage";
import Layout from "./layouts/Layout";
import NotFoundPage from "./components/template/404";
import AboutUs from "./components/template/AboutUs";
import Articles from "./components/template/Articles";
import Trems from "./components/template/Trems";
import Store from "./components/template/Store";
import Products from "./components/template/Products";
import ContactUs from "./components/template/ContactUs";
import ShoppingCart from "./components/template/ShoppingCart";
import Login from "./components/modules/Login";
import Verify from "./components/modules/Verify";
import Panel from "./components/template/Panel";
import UpdateProfile from "./components/modules/UpdateProfile";

function App() {
  const [products, setProducts] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isFav, setIsFav] = useState([]);
  const [filteredSearchProducts, setFilteredSearchProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [numberOfProduct, setNumberOfProduct] = useState(
    productCart.map(() => 1)
  );
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const updateHandler = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("totalCartPrice", totalCartPrice);
  };

  const searchHandler = () => {
    if (searchTerm.trim() === "") {
      setFilteredSearchProducts([...products]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSearchProducts(filtered);
    }
  };

  return (
    <BrowserRouter>
      <Layout
        productCart={productCart}
        name={name}
        setName={setName}
        lastname={lastname}
        setLastName={setLastName}
        totalCartPrice={totalCartPrice}
        setTotalCartPrice={setTotalCartPrice}
        filteredSearchProducts={filteredSearchProducts}
        setFilteredSearchProducts={setFilteredSearchProducts}
        products={products}
        searchHandler={searchHandler}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      >
        <Routes>
          <Route path="/account" element={<Login />} />
          <Route
            path="/Verify"
            element={
              <Verify
                isFirstTime={isFirstTime}
                setIsFirstTime={setIsFirstTime}
              />
            }
          />
          <Route
            path="/user-panel"
            element={
              <Panel
                productCart={productCart}
                name={name}
                setName={setName}
                lastname={lastname}
                setLastName={setLastName}
                isFav={isFav}
                setIsFav={setIsFav}
              />
            }
          />
          <Route
            path="/update-profile"
            element={
              <UpdateProfile
                name={name}
                setName={setName}
                lastname={lastname}
                setLastName={setLastName}
                updateHandler={updateHandler}
              />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/store" element={<Store />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/terms-and-conditions" element={<Trems />} />
          <Route
            path="/products"
            element={
              <Products
                productCart={productCart}
                setProductCart={setProductCart}
                isFav={isFav}
                setIsFav={setIsFav}
                isFirstTime={isFirstTime}
                setIsFirstTime={setIsFirstTime}
                handleAddToCart
                totalCartPrice={totalCartPrice}
                setTotalCartPrice={setTotalCartPrice}
                filteredSearchProducts={filteredSearchProducts}
                setFilteredSearchProducts={setFilteredSearchProducts}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/shopping-cart"
            element={
              <ShoppingCart
                productCart={productCart}
                setProductCartLayout={setProductCart}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                numberOfProduct={numberOfProduct}
                setNumberOfProduct={setNumberOfProduct}
                totalCartPrice={totalCartPrice}
                setTotalCartPrice={setTotalCartPrice}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
