import { useEffect, useState } from "react";
import { getTasks } from "../services/tasks";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await getTasks();

      if (res.success) {
        setTasks(res.data?.tasks);
      } else {
        setTasks([]);
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter(
    (t) => t.status === "pending" || t.status === "incomplete"
  ).length;

  // Priority counts
  const lowCount = tasks.filter((t) => t.priority === "low").length;
  const mediumCount = tasks.filter((t) => t.priority === "medium").length;
  const highCount = tasks.filter((t) => t.priority === "high").length;

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Status Counts */}
        <div className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition border border-transparent hover:border-blue-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Tasks</h2>
          <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
          <p className="text-xs text-gray-500 mt-1">Click to view all</p>
        </div>

        <div className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition border border-transparent hover:border-green-200">
          <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
          <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Click to filter</p>
        </div>

        <div className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition border border-transparent hover:border-yellow-200">
          <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-xs text-gray-500 mt-1">Click to filter</p>
        </div>

        {/* Priority Counts */}
        <div className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition border border-transparent hover:border-green-200">
          <h2 className="text-lg font-semibold text-gray-700">Low Priority</h2>
          <p className="text-3xl font-bold text-green-600">{lowCount}</p>
          <p className="text-xs text-gray-500 mt-1">Click to filter</p>
        </div>

        <div className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition border border-transparent hover:border-yellow-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Medium Priority
          </h2>
          <p className="text-3xl font-bold text-yellow-600">{mediumCount}</p>
          <p className="text-xs text-gray-500 mt-1">Click to filter</p>
        </div>

        <div className="cursor-pointer bg-white shadow rounded-lg p-6 text-center hover:bg-gray-50 transition border border-transparent hover:border-red-200">
          <h2 className="text-lg font-semibold text-gray-700">High Priority</h2>
          <p className="text-3xl font-bold text-red-600">{highCount}</p>
          <p className="text-xs text-gray-500 mt-1">Click to filter</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
