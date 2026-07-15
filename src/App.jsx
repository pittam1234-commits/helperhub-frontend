import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import WorkerLogin from "./pages/WorkerLogin";
import WorkerRegister from "./pages/WorkerRegister";

import Workers from "./pages/Workers";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";

import AdminDashboard from "./pages/AdminDashboard";
import AdminManagement from "./pages/AdminManagement";

import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerProfile from "./pages/WorkerProfile";
import WorkerBookings from "./pages/WorkerBookings";
import WorkerReviews from "./pages/WorkerReviews";

import UserBookings from "./pages/UserBookings";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/verify-otp" element={<VerifyOtp />} />

<Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/worker/login"
          element={<WorkerLogin />}
        />

        <Route
          path="/worker/register"
          element={<WorkerRegister />}
        />

        <Route
          path="/workers"
          element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            >
              <Workers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            >
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            >
              <UserBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            >
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute
              allowedRoles={["USER"]}
            >
              <Reviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["WORKER"]}
            >
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker/profile"
          element={
            <ProtectedRoute
              allowedRoles={["WORKER"]}
            >
              <WorkerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker/bookings"
          element={
            <ProtectedRoute
              allowedRoles={["WORKER"]}
            >
              <WorkerBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-reviews"
          element={
            <ProtectedRoute
              allowedRoles={["WORKER"]}
            >
              <WorkerReviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN"]}
            >
              <AdminManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </>
  );
}

export default App;