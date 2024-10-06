// SignIn.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./Account.module.css";

import logo from "../../assets/images/logo.png";

const SignIn = () => {
  const navigateTo = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const submitLogin = () => {
    console.log("Submitting login...");
    axios
      .post("https://api.mrh-store.com/api/authorize/login", {
        login: phoneNumber,
      })
      .then((res) => {
        console.log(res.data.data.status);
        setAuthToken(res.data.data.token);
        navigateTo("/Verify", {
          state: {
            token: res.data.data.token,
            status: res.data.data.status,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container__account}>
      <form className={styles.form__login}>
        <img src={logo} alt="" />
        <label htmlFor="phone">شماره تماس خود را وارد کنید:</label>
        <div>
          <input
            id="phone"
            className={styles.input__user_number}
            type="text"
            value={phoneNumber}
            placeholder="phone number..."
            onChange={(e) => setPhoneNumber(e.target.value)}
            dir="rtl"
          />
        </div>

        <button type="button" onClick={submitLogin}>
          بررسی
        </button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default SignIn;
