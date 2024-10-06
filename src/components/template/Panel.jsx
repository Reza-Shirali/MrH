import React from "react";
import styles from "./Panel.module.css";

import { LuHome } from "react-icons/lu";

function Panel({ name, setName, lastname, setLastName }) {
  return (
    <>
      <div className={styles.header__panel}>
        <LuHome className={styles.icon} />
        {name} {lastname}
      </div>
    </>
  );
}

export default Panel;
