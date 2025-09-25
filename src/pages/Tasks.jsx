import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTasks } from "../services/tasks";
import {
  Filter,
  Search,
  Plus,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AddTask from "../components/AddTask";
import Table from "../components/Table";
import { toast } from "react-toastify";

const Tasks = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // toggle filters
  const flag = useRef(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Update URL with filters + page
  const updateURL = useCallback(
    (newStatus, newPriority, newPage) => {
      const params = new URLSearchParams();
      if (newStatus !== "all") params.set("status", newStatus);
      if (newPriority !== "all") params.set("priority", newPriority);
      if (newPage && newPage > 1) params.set("page", newPage.toString());
      navigate(`/tasks?${params.toString()}`, { replace: true });
    },
    [navigate]
  );

  // Fetch tasks from backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const queryParams = {
      search: search.trim(),
      status: status === "all" ? "" : status,
      priority: priority === "all" ? "" : priority,
      page: page.toString(),
      limit: "10",
    };

    Object.keys(queryParams).forEach((key) => {
      if (!queryParams[key]) delete queryParams[key];
    });

    const query = new URLSearchParams(queryParams).toString();

    try {
      const res = await getTasks(query);
      if (res.success) {
        setTasks(res.data?.tasks || res.tasks || []);
        setTotalPages(res.data?.pagination?.totalPages || 1);
      } else {
        setTasks([]);
        setTotalPages(1);
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch tasks");
      setTasks([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, page]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const statusFilter = params.get("status");
    const priorityFilter = params.get("priority");
    const pageParam = parseInt(params.get("page"), 10);

    const newStatus = ["all", "completed", "pending"].includes(statusFilter)
      ? statusFilter
      : "all";
    const newPriority = ["all", "low", "medium", "high"].includes(
      priorityFilter
    )
      ? priorityFilter
      : "all";
    const newPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

    const shouldUpdate =
      newStatus !== status || newPriority !== priority || newPage !== page;

    if (shouldUpdate || flag.current) {
      setStatus(newStatus);
      setPriority(newPriority);
      setPage(newPage);
      flag.current = false;
      fetchTasks();
    }
  }, [location.search, fetchTasks, status, priority, page]);

  // Handlers
  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
    updateURL(value, priority, 1);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
    setPage(1);
    updateURL(status, value, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateURL(status, priority, newPage);
  };

  // Prevent background scroll when modal open
  useEffect(() => {
    if (showAddDialog) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [showAddDialog]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Tasks
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage and track your tasks efficiently
              </p>
            </div>

            <div className="flex  sm:gap-3 gap-2 md:flex-row">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
              >
                {showFilters ? (
                  <ChevronUp className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-1" />
                )}
                Filters
              </button>

              <button
                onClick={fetchTasks}
                disabled={loading}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md flex items-center text-sm sm:text-base transition-colors"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white shadow-sm rounded-lg border">
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="search" className="text-sm font-medium">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="search"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select
                      value={status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => handlePriorityChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <Table
            tasks={tasks}
            setTasks={setTasks}
            refetch={fetchTasks}
            loading={loading}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 px-4">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Dialog */}
      {showAddDialog && (
        <AddTask setShowAddDialog={setShowAddDialog} fetchTasks={fetchTasks} />
      )}
    </div>
  );
};

export default Tasks;
