import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import styles from "../template/ProductList.module.css";

function ProductList({ imageProducts }) {
  const displayProducts = imageProducts.length > 0 ? imageProducts : products;

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        autoplay={true}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className={styles.swiper_wrapper}
      >
        {displayProducts.map((image) => (
          <SwiperSlide key={image.id} className={styles.wrapper__products}>
            <Link to="/products" className={styles.link__product_list}>
              <img
                src={image.img}
                className={styles.image__product_title}
                alt={image.title}
              />
            </Link>
              <p className={styles.image__caption}>{image.title}</p>
              <Link to="/products" className={styles.link__product_list}><span>مشاهده بیشتر</span></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ProductList;
