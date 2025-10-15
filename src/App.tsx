import { Routes, Route, Navigate } from "react-router";

import Dashboard from "./routes/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentsInfo from "./routes/StudentsInfo";
import Login from "./routes/Login";
const App = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/student-info'
          element={
            <ProtectedRoute>
              <StudentsInfo />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};

export default App;
