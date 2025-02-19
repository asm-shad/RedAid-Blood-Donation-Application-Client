import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default Main;
