import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "../../services/apiData.js";
import Pagination from "../modules/Pagination.jsx";
import RangePrice from "../modules/RangePrice.jsx";
import styles from "../template/product.module.css";
import CircleLoader from "react-spinners/CircleLoader";
import { BsCart } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 15000000]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  console.log("Filtered Products:", filteredProducts);

  const changePageHandler = (click) => {
    setPage(click);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
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
          ) : filteredProducts.length > 0 ? (
            <ul className={styles.list}>
              {filteredProducts.map((product) => (
                <li key={product.id || product.name} className={styles.product}>
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
                        <div className={styles.add__product}>
                          <BsCart />
                        </div>
                      ) : (
                        <p>محصولی وجود ندارد</p>
                      )}
                    </div>
                    <div className={styles.show__product}>
                      <FaRegEye />
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
