import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/template/HomePage";
import Layout from "./layouts/Layout";
import Account from "./components/modules/Account";
import ShoppingCard from "./components/modules/ShoppingCard";
import NotFoundPage from "./components/template/404";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shopping-card" element={<ShoppingCard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
