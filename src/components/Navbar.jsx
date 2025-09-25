import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CircleUserRound,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../services/auth";
import { getAuthToken } from "../helpers/localstorage";
import { fetchUser } from "../toolkit/userSlice";

const Navbar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  const { name } = useSelector((state) => state.user.user);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Tasks", icon: ListTodo, path: "/tasks" },
  ];
  const token = getAuthToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(getUserInfo));
    }
  }, [dispatch, token]);
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] z-20 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-600 text-gray-100 flex flex-col z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="p-4 text-lg font-bold border-b border-blue-600">
          Task Manager
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActivePath(item.path);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-md mb-1 transition-colors
                  ${
                    isActive
                      ? "bg-blue-800 text-white"
                      : "text-gray-300 hover:bg-blue-700 hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white px-4 py-2 rounded-md">
            <CircleUserRound />
            <p>{name}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white hover:bg-blue-800 px-4 py-2 rounded-md"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
