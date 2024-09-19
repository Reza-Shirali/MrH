import React from "react";

import styles from "./Pagination.module.css";

function Pagination({ page, setPage,changePageHandler }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const nextHandler = () => {
    if (page > 6) return;
    setPage((page) => page + 1);
  };
  const handelClick = (event) => {
    const pageNumber = parseInt(event.target.innerHTML);
    changePageHandler(pageNumber);
  };

  return (
    <>
      <div className={styles.pagination}>
        <button
          onClick={previousHandler}
          className={page === 1 ? styles.disabled : null}
        >
          قبلی
        </button>
        <p
          className={page === 1 ? styles.selected : null}
          onClick={handelClick}
        >
          1
        </p>
        <p
          className={page === 2 ? styles.selected : null}
          onClick={handelClick}
        >
          2
        </p>
        <span className={styles.dots}>...</span>
        {page > 2 && page < 6 && (
          <>
            <p className={styles.selected}>{page}</p> <span className={styles.dots}>...</span>
          </>
        )}
        <p
          className={page === 6 ? styles.selected : null}
          onClick={handelClick}
        >
          6
        </p>
        <p
          className={page === 7 ? styles.selected : null}
          onClick={handelClick}
        >
          7
        </p>
        <button
          onClick={nextHandler}
          className={page === 7 ? styles.disabled : null}
        >
          بعدی
        </button>
      </div>
    </>
  );
}

export default Pagination;
