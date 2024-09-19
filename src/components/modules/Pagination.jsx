import React, { useState } from "react";

function Pagination({ products, currentPage }) {
  console.log(currentPage);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const itemPerPage = 10;

  const startIndex = (currentPageState - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const nextPageHandler = () => {
    const totalPages = Math.ceil(products.length / itemPerPage);
    if (currentPageState < totalPages) {
      setCurrentPageState((currentPageState) => currentPageState + 1);
    }
  };

  const PreviousPageHandler = () => {
    if (currentPageState > 1) {
      setCurrentPageState((currentPageState) => currentPageState - 1);
    }
  };

  return (
    <>
      <div>
        <ul>
          {currentItems.map((item) => (
            <li key={item.product_id}>{item.product_id}</li> // افزودن return
          ))}
        </ul>
        <button onClick={PreviousPageHandler}>Previous</button>
        <button onClick={nextPageHandler}>Next</button>
      </div>
    </>
  );
}

export default Pagination;
