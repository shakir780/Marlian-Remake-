import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./pages/CartPage";
import WishList from "./pages/WishList";
import Kids from "./pages/Kids";
import Women from "./pages/Women";
import Footer from "./components/Footer";
import Men from "./pages/Men";
import SearchResults from "./pages/SearchResults";
import CheckoutSuccess from "./components/CheckoutSuccess";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<WishList />} path="/wishlist" />
        <Route element={<Kids />} path="/kids" />
        <Route element={<Women />} path="/women" />
        <Route element={<Men />} path="/men" />
        <Route element={<SearchResults />} path="/search" />
        <Route element={<CheckoutSuccess />} path="/checkout-success" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
