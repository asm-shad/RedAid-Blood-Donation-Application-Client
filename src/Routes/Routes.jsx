import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Blog from "../pages/Blog/Blog";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import FundingPage from "../pages/FundingPage/FundingPage";
import DashboardLayout from "../Layout/DashboardLayout";

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
  {
    path: "/dashboard/profile",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h2>Registration data and can be edited </h2>,
      },
      {
        path: "donation-requests-table",
        element: (
          <h2>
            3 Donation Req in table format and a button to navigate Donation Req
            Table
          </h2>
        ),
      },
      {
        path: "my-donation-requests",
        element: <h2>All donation req made by the user, pagination, filter</h2>,
      },
      {
        path: "create-donation-request",
        element: <h2>Create page</h2>,
      },
      {
        path: "featured-section",
        element: <h2>Featured Section Screenshot given</h2>,
      },
      {
        path: "all-users",
        element: (
          <h2>All users filter, Pagination, volunteer, admin making option</h2>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: <h2>Most like my donation but show all req</h2>,
      },
      {
        path: "content-management",
        element: (
          <h2>will have an “Add Blog” button at the top right corner</h2>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: <h2>Most like my donation but show all req</h2>,
      },
      {
        path: "content-management/add-blog",
        element: <h2>Add Blog</h2>,
      },
      {
        path: "all-blood-donation-request",
        element: <h2>Most like my donation but show all req</h2>,
      },
      {
        path: "all-blood-donation-request",
        element: <h2>Most like my donation but show all req</h2>,
      },
      {
        path: "all-blood-donation-request",
        element: <h2>Most like my donation but show all req</h2>,
      },
    ],
  },
]);
