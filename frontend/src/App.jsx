
import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/Dashboard";
import Attendance from "./pages/attendance/Attendance";
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
          element={<Navigate to="/login" />}
        />

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/attendance" element={<Attendance />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </ErrorBoundary>
  );
}

export default App;
