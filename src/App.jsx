import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import LeaveRequests from "./pages/LeaveRequests";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="employees" element={<EmployeeDirectory />} />
              <Route path="leaves" element={<LeaveRequests />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
