import React from "react";

import styles from "./HomePage.module.css";

import Banner from "../modules/Banner.jsx";

import { imageBanner } from "../../services/imageBanner.js";

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
    </>
  );
}

export default HomePage;
