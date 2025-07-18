import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // includes Popper
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLogin from "./pages/UserLogin.jsx";
import Home from "./pages/Home.jsx";
import AddAcademicSubject from "./pages/AddAcademicSubject.jsx";
import AcademicSubject from "./pages/AcademicSubject.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { seedTestUser } from "./utils/seedUser.js";
seedTestUser();

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLogin />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/academic-subject",
    element: (
      <ProtectedRoute>
        <AcademicSubject />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addacademicsubject",
    element: (
      <ProtectedRoute>
        <AddAcademicSubject />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <UserLogin />,
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
