import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "../../services/apiData.js";
import Pagination from "../modules/Pagination.jsx";
import RangePrice from "../modules/RangePrice.jsx";
import CircleLoader from "react-spinners/CircleLoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../template/product.module.css";
import { BsCart } from "react-icons/bs";
import { IoHeart, IoCheckmarkSharp } from "react-icons/io5";

function ProductsPage({
  productCart,
  setProductCart,
  isFav,
  setIsFav,
  isFirstTime,
  setIsFirstTime,
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15000000]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartStatus, setCartStatus] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCart = localStorage.getItem("cart");

    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      const filtered = filterProductsByPrice(parsedProducts, priceRange);
      setFilteredProducts(filtered);
      updateLocalStorage(parsedProducts);
    } else {
      fetchProducts();
    }

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setProductCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
      updateLocalStorage(products);
    }
  }, [products]);

  useEffect(() => {
    const filtered = filterProductsByPrice(products, priceRange);
    setFilteredProducts(filtered);
    updateLocalStorage(filtered);
  }, [products, priceRange]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(REACT_APP_API_URL(page));
        const allProducts = response.data.data.products.data;
        setProducts(allProducts);
        localStorage.setItem("products", JSON.stringify(allProducts));
        const filtered = filterProductsByPrice(allProducts, priceRange);
        setFilteredProducts(filtered);
        updateLocalStorage(allProducts);
      } catch (err) {
        setError("خطایی در بارگذاری محصولات رخ داد.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, priceRange]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  const filterProductsByPrice = (products, range) => {
    return products.filter((product) => {
      if (product.features && product.features.length > 0) {
        const price = Number(product.features[0].price);
        return price >= range[0] && price <= range[1];
      }
      return true;
    });
  };

  const updateLocalStorage = (products) => {
    const totalProducts = products.length;
    const totalPrice = products.reduce((sum, product) => {
      const price = Number(product.features[0]?.price) || 0;
      return sum + price;
    }, 0);

    localStorage.setItem("totalProducts", totalProducts);
    localStorage.setItem("totalPrice", totalPrice);
  };

  const changePageHandler = (click) => {
    setPage(click);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
  };

  const addCartHandler = (id) => {
    const selectedProduct = products.find(
      (product) => product.product_id === id
    );
    if (selectedProduct) {
      setProductCart((prevCart) => {
        const isAlreadyInCart = prevCart.some(
          (product) => product.product_id === selectedProduct.product_id
        );
        if (!isAlreadyInCart) {
          const updatedCart = [...prevCart, selectedProduct];
          localStorage.setItem("cart", JSON.stringify(updatedCart));

          setCartStatus((prevStatus) => ({ ...prevStatus, [id]: true }));
          setTimeout(() => {
            setCartStatus((prevStatus) => ({ ...prevStatus, [id]: false }));
          }, 3000);
          return updatedCart;
        }
        return prevCart;
      });
    }
  };

  const addFavHandler = (id) => {
    if (!isLoggedIn) {
      navigate("/account");
    } else {
      const selectedProduct = products.find(
        (product) => product.product_id === id
      );
      if (selectedProduct) {
        setIsFav((prevFav) => {
          const isAlreadyFav = prevFav.some(
            (product) => product.product_id === selectedProduct.product_id
          );
          if (!isAlreadyFav) {
            return [...prevFav, selectedProduct];
          }
          return prevFav;
        });
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <RangePrice onPriceChange={handlePriceChange} />
        <div className={styles.container__products}>
          {loading ? (
            <div className={styles.loading}>
              <CircleLoader
                color="#33ebec"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className={styles.loader}
              />
              <span>در حال بارگذاری...</span>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : products.length > 0 ? (
            <ul className={styles.list}>
              {filteredProducts.map((product) => (
                <li key={product.product_id} className={styles.product}>
                  {product.features && product.features.length > 0 ? null : (
                    <div className={styles.non_existent}>ناموجود</div>
                  )}
                  <img
                    className={styles.image__product_title}
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0].image_link
                        : "default-image.jpg"
                    }
                    alt={product.name || "Product Image"}
                  />
                  <p>{product.name}</p>
                  <div className={styles.product__info}>
                    <div>
                      {product.features && product.features.length > 0 ? (
                        <div
                          className={styles.add__product}
                          onClick={() => addCartHandler(product.product_id)}
                        >
                          {cartStatus[product.product_id] ? (
                            <IoCheckmarkSharp />
                          ) : (
                            <BsCart />
                          )}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={styles.show__product}
                      onClick={() => addFavHandler(product.product_id)}
                    >
                      <IoHeart />
                    </div>
                    <div className={styles.product__price}>
                      <span>
                        {product.features && product.features.length > 0
                          ? Number(product.features[0].price).toLocaleString(
                              "fa-IR"
                            ) + " تومان"
                          : "ناموجود"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.no_products}>
              <p>در این بازه محصولی وجود ندارد</p>
            </div>
          )}
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        changePageHandler={changePageHandler}
      />
    </>
  );
}

export default ProductsPage;
