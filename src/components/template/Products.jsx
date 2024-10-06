import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "../../services/apiData.js";
import Pagination from "../modules/Pagination.jsx";
import RangePrice from "../modules/RangePrice.jsx";
import CircleLoader from "react-spinners/CircleLoader";
import { useNavigate } from "react-router-dom"; // برای هدایت به صفحه لاگین
import styles from "../template/product.module.css";
import { BsCart } from "react-icons/bs";
import { IoHeart } from "react-icons/io5";

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
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 15000000]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(REACT_APP_API_URL(page));
        const allProducts = response.data.data.products.data;
        setProducts(allProducts);
        const filtered = filterProductsByPrice(allProducts, priceRange);
        setFilteredProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("خطایی در بارگذاری محصولات رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, priceRange]);

  const filterProductsByPrice = (products, range) => {
    return products.filter((product) => {
      if (product.features && product.features.length > 0) {
        const price = Number(product.features[0].price);
        return price >= range[0] && price <= range[1];
      }
      return false;
    });
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
          return [...prevCart, selectedProduct];
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

  console.log(productCart);

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
              {products.map((product) => (
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
                          <BsCart />
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={styles.show__product}
                      onClick={() => addFavHandler(product.product_id)} // اضافه کردن به علاقه‌مندی‌ها
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
