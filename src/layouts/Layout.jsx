import React from "react";

function Layout({ children }) {
  return (
    <>
      <header></header>
      {children}
      <footer></footer>
    </>
  );
}

export default Layout;
