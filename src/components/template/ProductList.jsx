import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      >
        {displayProducts.map((image) => (
          <SwiperSlide key={image.id} className={styles.wrapper__products}>
            <Link to="/products">
              <img
                src={image.img}
                className={styles.image__product_title}
                alt={image.title}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ProductList;
