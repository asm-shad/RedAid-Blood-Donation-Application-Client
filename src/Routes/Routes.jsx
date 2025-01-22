import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Blog from "../pages/Blog/Blog";
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import FundingPage from "../pages/FundingPage/FundingPage";
import DashboardLayout from "../Layout/DashboardLayout";
import BlogDetails from "../pages/Blog/BlogDetails";
import SearchPage from "../pages/SearchPage/SearchPage";
import NotFound from "../pages/ErrorPage/NotFound";

// Admin Pages
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequests";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import EditBlog from "../pages/Dashboard/Admin/EditBlog";
// import DonationRequestDetailsAdmin from "../pages/Dashboard/Admin/DonationRequestDetails";

// Donor Pages
import DonorDashboard from "../pages/Dashboard/Donor/DonorDashboard";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import EditDonationRequest from "../pages/Dashboard/Common/EditDonationRequest";

// Volunteer Pages
import VolunteerDashboard from "../pages/Dashboard/Volunteer/VolunteerDashboard";
import VolunteerDonationRequests from "../pages/Dashboard/Volunteer/VolunteerDonationRequests";
// import DonationRequestDetailsVolunteer from "../pages/Dashboard/Volunteer/DonationRequestDetails";

// Profile Page
import EditProfile from "../pages/EditProfile/EditProfile";
import Profile from "../pages/Dashboard/Common/Profile";
// import AllDonationRequestDetails from "../pages/Dashboard/Admin/AllDonationRequestDetails";
import DonationRequestDetails from "../pages/DonationRequests/DonationRequestDetails";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id", // Blog details
        element: <BlogDetails />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests />,
      },
      {
        path: "/donation-requests/:id",
        element: <DonationRequestDetails />,
      },
      {
        path: "/funding-links",
        element: <FundingPage />,
      },
      {
        path: "*", // Fallback for undefined routes
        element: <NotFound />,
      },
    ],
  },

  // Dashboard Routes (Private)
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true, // This acts as the default page when accessing /dashboard
        element: <Navigate to="/dashboard/profile" replace />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // Admin Routes
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-donation-requests",
        element: (
          <AdminRoute>
            <AllDonationRequests />
          </AdminRoute>
        ),
      },
      // {
      //   path: "admin/all-donation-requests/:id",
      //   element: <AllDonationRequestDetails />,
      // },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      {
        path: "content-management/edit-blog/:id",
        element: <EditBlog />,
      },

      // Donor Routes
      {
        path: "donor",
        element: <DonorDashboard />,
      },
      {
        path: "donor/my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "donor/create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "donor/edit-donation-request/:id",
        element: <EditDonationRequest />,
      },

      // Volunteer Routes
      {
        path: "volunteer",
        element: <VolunteerDashboard />,
      },
      {
        path: "volunteer/all-donation-requests",
        element: <VolunteerDonationRequests />,
      },
      // {
      //   path: "volunteer/all-donation-requests/:id",
      //   element: <DonationRequestDetails />,
      // },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
    ],
  },
]);
