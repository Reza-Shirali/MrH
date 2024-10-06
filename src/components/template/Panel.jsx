import React from "react";
import styles from "./Panel.module.css";

import { LuHome } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Panel({ name, lastname, isFav, setIsFav }) {
  const deleteHandlerFav = (productId) => {
    const updatedFavs = isFav.filter((item) => item.product_id !== productId);
    setIsFav(updatedFavs);
  };

  return (
    <>
      <div className={styles.header__panel}>
        {name} {lastname}
        <Link to="/">
          <LuHome className={styles.icon} />
        </Link>
      </div>

      <div className={styles.fav__product}>
        {isFav.length > 0 ? (
          isFav.map((item) => (
            <div key={item.product_id} className={styles.wrapper__card_fav}>
              <div className={styles.wrapper__right_fav}>
                <img
                  src={item.images[0]?.image_link || "default-image.jpg"}
                  className={styles.image_fav}
                  alt={item.name}
                />
                <span className={styles.name__fav}>{item.name}</span>
              </div>
              <FaRegTrashAlt
                className={styles.trash_fav}
                onClick={() => deleteHandlerFav(item.product_id)}
              />
            </div>
          ))
        ) : (
          <p className={styles.empty__fav}>لیست علاقه‌مندی‌ها خالی است.</p>
        )}
      </div>
    </>
  );
}

export default Panel;
