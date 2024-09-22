import React from "react";

import styles from "./ShoppingCart.module.css";

function ShoppingCart() {
  return (
    <>
      <div className={styles.container__shopping_cart}>
        <h3>سبد خرید</h3>
        <div className={styles.wrapper__itemCart}>
          <div className={styles.wrapper__product_cart}></div>
          <div className={styles.wrapper__total_price}></div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
