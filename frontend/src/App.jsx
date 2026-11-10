
import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/login/login";
import Register from "./pages/register/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import Attendance from "./pages/attendance/Attendance";
import People from "./pages/people/People";

import NotFound from "./pages/notfound/NotFound";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        {/* Protected Application Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/people" element={<People />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
