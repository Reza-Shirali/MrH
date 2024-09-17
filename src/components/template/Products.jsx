import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "../../services/apiData.js";

import styles from "../template/product.module.css";

import { BsCart } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(REACT_APP_API_URL).then((res) => {
      setProducts(res.data.data.products.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__products}>
        <ul className={styles.list}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <li key={index} className={styles.product}>
                <img
                  className={styles.image__product_title}
                  src={product.images[0].image_link}
                  alt={product.name || "Product Image"}
                />
                <p>{product.name}</p>
                <div className={styles.product__info}>
                  <div className={styles.add__product}>
                    <BsCart />
                  </div>
                  <div className={styles.show__product}>
                    <FaRegEye />
                  </div>
                  <div className={styles.product__price}>
                    5000
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li>No products available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProductsPage;
