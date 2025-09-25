import "./index.css";
import { Routes, Route } from "react-router-dom";

import LogIn from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import ProtectedRoute from "./hoc/WithAuth";
import Tasks from "./pages/Tasks";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-0">
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectedRoute isPublic={true}>{<SignUp />}</ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isPublic={true}>{<LogIn />}</ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isPublic={false}>{<Dashboard />}</ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute isPublic={false}>{<Tasks />}</ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
