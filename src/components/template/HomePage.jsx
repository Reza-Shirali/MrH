import React from "react";

import Banner from "../modules/Banner.jsx";

import { imageBanner } from "../../services/imageBanner.js";

function HomePage() {
  return (
    <>
      <Banner imageBanner={imageBanner} />
    </>
  );
}

export default HomePage;
