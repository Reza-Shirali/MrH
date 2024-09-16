import React from "react";


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

import styles from "../template/ProductList.module.css"
function ProductList({ imageProducts }) {
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
        {imageProducts.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <img src={image.img} className={styles.image__product_title} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default ProductList;
