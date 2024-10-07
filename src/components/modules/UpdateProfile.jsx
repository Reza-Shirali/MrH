import React from "react";
import styles from "./UpdateProfile.module.css";
import Logo from "../../assets/images/logo.png";

function UpdateProfile({
  name,
  setName,
  lastname,
  setLastName,
  updateHandler,
})
{
    
  return (
    
    <>
      <div className={styles.wrapper__update}>
        <img src={Logo} alt="logo" className={styles.logo__update} />
        <div className={styles.wrapper__card_update}>
          <label>نام</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.wrapper__card_update}>
          <label>فامیل</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button onClick={updateHandler}>تایید</button>
      </div>
    </>
  );
}

export default UpdateProfile;
