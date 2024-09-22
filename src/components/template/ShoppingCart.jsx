import React, { useEffect, useState } from "react";

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
          <div className={styles.wrapper__total_price}>
            <div className={styles.total__box}>
              <div className={styles.total__price}>
                <p>جمع کل کالاها</p>
                <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className={styles.total__offer}>
                <p>تخفیف کل کالا ها</p>
                <span>0 تومان</span>
              </div>
              <div className={styles.total__price_final}>
                <h3>جمع سبد خرید</h3>
                <p>{totalPrice.toLocaleString("fa-IR")} تومان</p>
              </div>
              <button className={styles.continue__buy}>
                ادامه فرآیند خرید
              </button>
              <span className={styles.caption}>
                هزینه‌ی ارسال در ادامه بر اساس آدرس، زمان و نحوه‌ی ارسال انتخابی
                شما‌ محاسبه و به این مبلغ اضافه خواهد شد
              </span>
            </div>
            <p className={styles.total__caption}>
              کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند، برای ثبت سفارش مراحل
              بعدی را تکمیل کنید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
