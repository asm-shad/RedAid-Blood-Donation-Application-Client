import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Blog from "../pages/Blog/Blog";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import FundingPage from "../pages/FundingPage/FundingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "/funding-links",
        element: <FundingPage></FundingPage>,
      },
    ],
  },
]);
