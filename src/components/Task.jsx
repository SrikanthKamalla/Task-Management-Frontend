import { CalendarDays, Trash2 } from "lucide-react";
import { deleteTask, updateTask } from "../services/tasks";

const Task = ({ task, refetch }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCheckboxChange = async (task) => {
    const response = await updateTask(task._id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
    if (response.success) {
      refetch();
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteTask(id);
    if (response.success) {
      refetch();
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Status */}
      <td className="px-2 sm:px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => handleCheckboxChange(task)}
          className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </td>

      {/* Title */}
      <td className="px-2 sm:px-4 py-2 text-sm sm:text-base font-medium text-gray-900">
        {task.title}
      </td>

      {/* Description */}
      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600">
        {task.description || "-"}
      </td>

      {/* Priority */}
      <td className="px-2 sm:px-4 py-2">
        <span
          className={`text-xs sm:text-sm px-2 py-1 rounded-full ${getPriorityColor(
            task.priority
          )} capitalize`}
        >
          {task.priority}
        </span>
      </td>

      {/* Due Date */}
      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600">
        {task.dueDate ? (
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
            {formatDate(task.dueDate)}
          </div>
        ) : (
          "-"
        )}
      </td>

      {/* Actions */}
      <td className="px-2 sm:px-4 py-2 text-center">
        <button
          className="text-red-600 hover:text-red-800 p-1 sm:p-2 rounded hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto"
          onClickCapture={() => handleDelete(task._id)}
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </td>
    </tr>
  );
};

export default Task;
