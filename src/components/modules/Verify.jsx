import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../modules/Verify.module.css";

const Verify = ({ isFirstTime, setIsFirstTime }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.token) {
      setToken(location.state.token);
    }

    const storedName = localStorage.getItem("name");
    const storedLastName = localStorage.getItem("lastName");

    if (storedName && storedLastName) {
      setName(storedName);
      setLastName(storedLastName);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, [location, setIsFirstTime]);

  const handleVerify = () => {
    axios
      .post(`https://api.mrh-store.com/api/authorize/verify`, {
        name,
        lastname,
        token,
        code,
      })
      .then((response) => {
        const { data } = response.data;
        console.log("Response Data:", data);

        setToken(data);
        localStorage.setItem("token", data);
        localStorage.setItem("name", name);
        localStorage.setItem("lastName", lastname);
        localStorage.setItem("isLoggedIn", true);

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError("تایید ناموفق، لطفاً اطلاعات را بررسی کنید.");
      });
  };

  return (
    <div className="verify">
      <form
        className={styles.form__login}
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
      >
        {isFirstTime && (
          <>
            <label>
              نام:
              <input
                className={styles.x}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              فامیل:
              <input
                className={styles.x}
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </>
        )}
        <label>
          کد ارسال شده:
          <input
            className={styles.x}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}{" "}
        <button type="submit">تایید</button>
      </form>
    </div>
  );
};

export default Verify;
