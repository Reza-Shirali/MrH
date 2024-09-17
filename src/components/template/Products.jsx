import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "../../services/apiData.js";

import styles from "../template/styles.module.css"

function ProductsPage() {
  const [products, setProducts] = useState([]);
  // const apiUrl  = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(REACT_APP_API_URL).then((res) => {
      setProducts(res.data.data.products.data);
    });
  }, []);


  return (
    <div className={styles.container}>
      <h1>Products Page</h1>
      <ul className={styles.list}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <li key={index} >
              <img
              className={styles.image__product_title}
                src={product.images[0].image_link}
                alt={product.name || "Product Image"}
              />
              <p>{product.name}</p>
            </li>
          ))
        ) : (
          <li>No products available</li>
        )}
      </ul>
    </div>
  );
}

export default ProductsPage;
