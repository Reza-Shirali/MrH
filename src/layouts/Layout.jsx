import React, { useState, useEffect } from "react";
import NavBar from "../components/modules/NavBar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdSmartphone } from "react-icons/md";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaShareAlt,
} from "react-icons/fa";
import Enamad from "../assets/images/enamad.png";
import imageFooter from "../assets/images/footerBG.webp";
import styles from "./Layout.module.css";
import logo from "../assets/images/logo.png";
import logoProduct from "../assets/images/products.webp";
import hammer from "../assets/images/terms.webp";
import { IoCartOutline } from "react-icons/io5";
import { IoLink } from "react-icons/io5";
import { LuHome } from "react-icons/lu";

function Layout({ children, productCart }) {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // برای کنترل نمایش dropdown

  // Use useEffect to get user info from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedLastName = localStorage.getItem("lastName");

    if (storedName && storedLastName) {
      setName(storedName);
      setLastName(storedLastName);
    }
  }, []);

  const handleLogout = () => {
    // اطلاعات کاربر را از localStorage حذف کن
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    localStorage.removeItem("token");
    // وضعیت نام و فامیل را خالی کن
    setName("");
    setLastName("");
  };

  const navBarItems = [
    { id: 1, titleFa: "صفحه اصلی", titleEn: "HOME", icon: <LuHome /> },
    {
      id: 2,
      titleFa: "فروشگاه",
      titleEn: "STORE",
      icon: <BsFillBasket2Fill />,
    },
    {
      id: 3,
      titleFa: "محصولات",
      titleEn: "PRODUCTS",
      icon: <img src={logoProduct} alt="product" />,
    },
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
      icon: <img src={hammer} alt="terms" />,
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__right}>
          {name && lastname ? (
            <div
              className={styles.user__account}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className={styles.wrapper__name__lastName}>
                <FaUser className={styles.icon} />
                <span className={styles.name_lastName}>
                  {name} {lastname}
                </span>
              </div>
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <Link to="/user-panel" className={styles.dropdown__item}>
                    ورود به پنل کاربری
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.dropdown__item}
                  >
                    خروج از حساب کاربری
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.user__account}>
              <Link to="/account" className={styles.user__account}>
                <FaUser className={styles.icon} />
                <span>حساب کاربری</span>
              </Link>
            </div>
          )}
          <Link to="/shopping-cart" className={styles.shopping__basket}>
            <p
              className={
                productCart.length ? styles.shopping__cart_number : styles.dis
              }
            >
              {productCart.length}
            </p>
            <SlBasket className={styles.icon} />
            <span>سبد خرید</span>
          </Link>
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

      <footer
        className={styles.wrapper__footer}
        style={{
          background: `url(${imageFooter})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "",
        }}
      >
        <div className={styles.footer}>
          <div className={styles.footer__title}>
            <IoCartOutline className={styles.footer__title_icon} />
            <h2>خرید اکشن فیگور</h2>
          </div>
          <div className={styles.footer__main}>
            <div className={styles.footer__one}>
              <div className={styles.footer__one_title}>
                <IoLink />
                <p>لینک سریع</p>
              </div>
              <div className={styles.footer__one_items}>
                <Link to="/">صفحه اصلی</Link>
                <Link to="/products">اکشن فیگور</Link>
                <Link to="/products">فیگور های انیمه </Link>
                <Link to="/products">فیگور های غیر انیمه </Link>
                <Link to="/products">اکسسوری های کلکسیونی </Link>
                <Link to="/articles">مقالات </Link>
                <Link to="/contact-us">تماس با ما </Link>
                <Link to="/terms-and-conditions">قوانین و مقررات </Link>
              </div>
            </div>
            <div
              className={`${styles.footer__one} ${styles.footer__one_option}`}
            >
              <div className={styles.footer__one_title}>
                <IoCall />
                <p>ارتباط با ما</p>
              </div>
              <div className={styles.footer__one_items}>
                <div className={styles.item__one}>
                  <MdSmartphone />
                  <span>09010313531</span>
                </div>
                <div className={styles.item__one}>
                  <MdSmartphone />
                  <span>09010313531</span>
                </div>
              </div>
              <div className={styles.footer__one_caption}>
                <p>
                  استان البرز، کرج-عظیمیه-میدان مهران-برج ماندگار-طبقه منفی 3
                  واحد 13
                </p>
              </div>
            </div>
            <div
              className={`${styles.footer__one} ${styles.footer__one_option}`}
            >
              <div className={styles.footer__one_title_last}>
                <FaShareAlt />
                <p>شبکه های اجتماعی</p>
              </div>
              <div className={styles.footer__one_items}>
                <FaWhatsapp className={styles.social__media} />
                <FaTelegramPlane className={styles.social__media} />
                <FaInstagram className={styles.social__media} />
              </div>
            </div>
            <div className={styles.footer__last}>
              <img src={logo} alt="logoFooter" />
              <div className={styles.etemad}>
                <div className={styles.etemad__two}>
                  <img
                    src="https://cdn.zarinpal.com/badges/trustLogo/1.svg"
                    alt=""
                  />
                </div>
                <div className={styles.etemad__two}>
                  <img
                    src={Enamad}
                    className={styles.enamad__img}
                    alt="Enamad"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
