import React from "react";
import NavBar from "../components/modules/NavBar";

import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { IoNewspaperSharp } from "react-icons/io5";

import styles from "./Layout.module.css";
import logo from "../assets/images/logo.png";
import logoProduct from "../assets/images/products.webp";
import { LuHome } from "react-icons/lu";
import hammer from "../assets/images/terms.webp";

function Layout({ children }) {
  const navBarItems = [
    { id: 1, titleFa: "صفحه اصلی", titleEn: "HOME", icon: <LuHome /> },
    {
      id: 2,
      titleFa: "فروشگاه",
      titleEn: "STORE",
      icon: <BsFillBasket2Fill />,
    },
    { id: 3, titleFa: "محصولات", titleEn: "PRODUCTS", icon: <img src={logoProduct} /> },
    {
      id: 4,
      titleFa: "تماس با ما",
      titleEn: "CONTACT US",
      icon: <FiPhoneCall />,
    },
    { id: 5, titleFa: "درباره ما", titleEn: "ABOUT US", icon: <LuUsers /> },
    {
      id: 6,
      titleFa: "مقالات",
      titleEn: "ARTICLES",
      icon: <IoNewspaperSharp />,
    },
    {
      id: 7,
      titleFa: "قوانین و مقررات",
      titleEn: "TERMS AND CONDITIONS",
      icon: <img src={hammer}/>,
    },
  ];
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__right}>
          <Link to="/shopping-card" className={styles.shopping__basket}>
            <SlBasket className={styles.icon} />
            <span>سبد خرید</span>
          </Link>
          <div className={styles.user__account}>
            <Link to="/account" className={styles.user__account}>
              <FaUser className={styles.icon} />
              <span>حساب کاربری</span>
            </Link>
          </div>
        </div>
        <Link to="/" className={styles.header__center}>
          <img src={logo} className={styles.logo} alt="Website Logo" />
        </Link>
        <div className={styles.header__left}>
          <div className={styles.wrapper__search}>
            <input type="text" placeholder="جست و جوی نام محصول..." />
            <CiSearch className={styles.icon__search} />
          </div>
        </div>
      </header>
      <div className={styles.nav__bar}>
        <NavBar navBarItems={navBarItems} />
      </div>
      <main>{children}</main>
      <footer className={styles.footer}>{/* Add footer content here */}</footer>
    </>
  );
}

export default Layout;
