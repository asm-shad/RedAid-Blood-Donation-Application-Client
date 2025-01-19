import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient
import { Toaster } from "react-hot-toast"; // Import Toaster for toast notifications
import "react-toastify/dist/ReactToastify.css"; // Optional: if Toastify styles are needed

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {/* Router for the application */}
          <RouterProvider router={router} />
        </QueryClientProvider>
        {/* Toast notifications */}
        <Toaster position="top-right" reverseOrder={false} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
