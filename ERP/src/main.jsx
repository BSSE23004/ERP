import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // includes Popper
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLogin from "./pages/UserLogin.jsx";
import Home from "./pages/Home.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { seedTestUser } from "./utils/seedUser.js";
seedTestUser();

const router = createBrowserRouter([
  {
    path: "*",
    element: <UserLogin />,
  },
  {
    element: <UserLogin />,
    path: "/",
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ), //Protected Route is doing the Authentication
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
