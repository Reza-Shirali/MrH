import React from "react";

import styles from "./Navbar.module.css";

function NavBar({ navBarItems }) {
  return (
    <>
      <ul className={styles.wrapper__navBar}>
        {navBarItems.map((item) => {
          return (
            <li key={item.id} className={styles.navbar__item}>
              <div className={styles.icon__navbar}>{item.icon}</div>
              <div>
                <p className={styles.navbar__titleFa}>{item.titleFa}</p>
                <p className={styles.navbar__titleEn}>{item.titleEn}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NavBar;
