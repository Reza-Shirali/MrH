import React from "react";

import styles from "./HomePage.module.css";

import Banner from "../modules/Banner.jsx";
import ProductList from "./ProductList.jsx";

import { imageBanner } from "../../services/imageBanner.js";
import { imageProducts } from "../../services/imageProductHomePage.js";

function HomePage() {
  return (
    <>
      <Banner imageBanner={imageBanner} />
      <div className={styles.container__title}>
        <h2>
          محصولات
          <span className={styles.title}>محصولات</span>
        </h2>
      </div>
      <ProductList imageProducts={imageProducts} />
    </>
  );
}

export default HomePage;
