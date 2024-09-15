import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function NavBar({ navBarItems }) {
  const links = {
    1: "/",
    2: "/store",
    3: "/products",
    4: "/contact-us",
    5: "/about-us",
    6: "/articles",
    7: "/terms-and-conditions",
  };

  return (
    <ul className={styles.wrapper__navBar}>
      {navBarItems.map((item) => {
        const path = links[item.id] || "/";
        return (
          <li key={item.id} className={styles.navbar__item}>
            <Link to={path} className={styles.navbar__item}>
              <div className={styles.icon__navbar}>{item.icon}</div>
              <div>
                <p className={styles.navbar__titleFa}>{item.titleFa}</p>
                <p className={styles.navbar__titleEn}>{item.titleEn}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavBar;
