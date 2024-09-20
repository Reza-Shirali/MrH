import React, { useState } from "react";
import Slider from "@mui/material/Slider";

import styles from "./RangePrice.module.css";

function RangePrice({ onPriceChange }) {
  const [value, setValue] = useState([0, 23400000]); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    onPriceChange(newValue);
  };

  return (
    <>
      <div className={styles.wrapper__range}>
        <span className={styles.range__title}>محدوده قیمت</span>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          min={0}
          max={23400000}
          valueLabelFormat={(x) => `${x.toLocaleString("fa-IR")} تومان`}
          className={styles.range}
        />
        <p>
          از <span>{value[0].toLocaleString("fa-IR")}</span> تومان
        </p>
        <p>
          تا <span>{value[1].toLocaleString("fa-IR")}</span> تومان
        </p>
      </div>
    </>
  );
}

export default RangePrice;
