import React, { useEffect, useState } from "react";
import { addTask } from "../services/tasks";
import { toast } from "react-toastify";

const AddTask = ({ setShowAddDialog, fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const inputRef = React.useRef(null);

  const handleAddTask = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title cannot be empty";
    }

    if (!description.trim()) {
      newErrors.description = "Description cannot be empty";
    }
    if (!dueDate) {
      newErrors.dueDate = "Please select a due date";
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const data = await addTask({
        title,
        description,
        priority: taskPriority,
        dueDate: dueDate || null,
      });

      if (data.success) {
        setTitle("");
        setDescription("");
        setTaskPriority("medium");
        setDueDate("");
        setShowAddDialog(false);
        fetchTasks();
      }
    } catch (err) {
      toast.error(err.message || "Failed to add task");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Add New Task</h2>
          </div>
          <form onSubmit={handleAddTask} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <br />
              {errors.title && (
                <span className="text-red-500 text-[13px] pl-2">
                  {errors.title}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              <br />
              {errors.description && (
                <span className="text-red-500 text-[13px] pl-2">
                  {errors.description}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
                <br />
                {errors.dueDate && (
                  <span className="text-red-500 text-[13px] pl-2">
                    {errors.dueDate}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setShowAddDialog(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
