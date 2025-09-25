// import { CheckCircle } from "lucide-react";
// import React from "react";
// import Task from "./Task";

// const Table = ({ tasks, refetch, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
//       {tasks.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-12">
//           <div className="text-center space-y-3">
//             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
//               <CheckCircle className="h-8 w-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold">No tasks found</h3>
//             <p className="text-gray-600">
//               Get started by creating your first task
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse">
//             {/* Table Header */}
//             <thead className="bg-gray-50 text-xs font-medium text-gray-600 uppercase tracking-wider">
//               <tr>
//                 <th className="px-4 py-3 border-b text-center">Status</th>
//                 <th className="px-4 py-3 border-b text-left">Title</th>
//                 <th className="px-4 py-3 border-b text-left">Description</th>
//                 <th className="px-4 py-3 border-b text-left">Priority</th>
//                 <th className="px-4 py-3 border-b text-left">Due Date</th>
//                 <th className="px-4 py-3 border-b text-center">Actions</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody className="divide-y">
//               {tasks.map((task) => (
//                 <Task key={task._id} task={task} refetch={refetch} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

import { CheckCircle } from "lucide-react";
import React from "react";
import Task from "./Task";

const Table = ({ tasks, refetch, loading }) => {
  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold">No tasks found</h3>
            <p className="text-gray-600">
              Get started by creating your first task
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            {/* Table Header */}
            <thead className="bg-gray-50 text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b text-center">Status</th>
                <th className="px-4 py-3 border-b text-left">Title</th>
                <th className="px-4 py-3 border-b text-left">Description</th>
                <th className="px-4 py-3 border-b text-left">Priority</th>
                <th className="px-4 py-3 border-b text-left">Due Date</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y text-sm sm:text-base">
              {tasks.map((task) => (
                <Task key={task._id} task={task} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
