import { Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuthToken } from "../helpers/localstorage";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const ProtectedRoute = ({ children, isPublic = false }) => {
  const token = getAuthToken();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!token && !isPublic) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (token && isPublic) {
    return <Navigate to="/" replace />;
  }

  return !isPublic ? (
    <div className="flex min-h-screen bg-gray-50">
      {/* Top Navbar for mobile */}
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white flex items-center justify-between p-4 md:hidden h-16">
        <button className="p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-6 w-6" />
        </button>
        <div className="font-bold text-lg">Task Manager</div>
      </div>

      {/* Sidebar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto mt-16 md:mt-0 md:ml-64">
        {children}
      </div>
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
