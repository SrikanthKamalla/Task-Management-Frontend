import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import { fetchUserLogin } from "../toolkit/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);

      const resultAction = await dispatch(
        fetchUserLogin({ login, loginUser: { email, password } })
      );

      if (fetchUserLogin.fulfilled.match(resultAction)) {
        if (resultAction.payload.success) {
          toast.success(resultAction.payload.message);
          navigate("/");
        } else {
          toast.error(resultAction.payload.message || "Login failed");
        }
      } else {
        toast.error(resultAction.payload?.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const addSampleCredentials = (e) => {
    e.preventDefault();
    setEmail(import.meta.env.VITE_SAMPLE_DATA);
    setPassword(import.meta.env.VITE_SAMPLE_DATA);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              Primetrade.ai
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="text-gray-600">
              Enter your credentials to access the dashboard
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="p-6 flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sign In..." : "Sign In"}
              </button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?
                <a
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:text-blue-700 font-medium  cursor-pointer"
                >
                  Sign Up
                </a>
              </p>
            </div>

            <button
              onClick={addSampleCredentials}
              className="m-auto mb-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-[10px] py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login with Sample Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
