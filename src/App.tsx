import { Routes, Route, Navigate } from "react-router";

import Dashboard from "./routes/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentsInfo from "./routes/StudentsInfo";
import ChangePassword from "./routes/ChangePassword";
import Login from "./routes/Login";
import Timetable from "./routes/Timetable";
import SetAnnouncements from "./routes/setAnnouncements";

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
        <Route
          path='/change-password'
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/timetable'
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path='/set-announcements'
          element={
            <ProtectedRoute>
              <SetAnnouncements />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
};

export default App;
