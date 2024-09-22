import React from "react";

import styles from "./ShoppingCart.module.css";

import { FaRegTrashAlt } from "react-icons/fa";

function ShoppingCart({ productCart }) {
  console.log(productCart);
  return (
    <>
      <div className={styles.container__shopping_cart}>
        <h3>سبد خرید</h3>
        <div className={styles.wrapper__itemCart}>
          <ul className={styles.wrapper__product_cart}>
            {productCart.map((product) => {
              return (
                <li key={product.product_id}>
                  <img
                    src={product.images[0].image_link}
                    alt={product.category.title}
                  />
                  <div className={styles.product__cart_info}>
                    <div className={styles.wrapper__info_caption}>
                      <p className={styles.product__cart_name}>
                        {product.name}
                      </p>
                      <span className={styles.product__cart_price}>
                        {Number(product.features[0].price).toLocaleString(
                          "fa-IR"
                        ) + " تومان"}
                      </span>
                    </div>
                    <div className={styles.wrapper__number_of}>
                      <div className={styles.numbers}>
                        <span className={styles.plus}>+</span>
                        <span className={styles.show}>2</span>
                        <span className={styles.mines}>-</span>
                      </div>
                      <div className={styles.delete_item}>
                        <FaRegTrashAlt />
                        <span>حذف</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.wrapper__total_price}>s</div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
