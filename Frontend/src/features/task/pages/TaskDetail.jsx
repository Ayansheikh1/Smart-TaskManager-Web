import { useNavigate, useParams} from "react-router";
import { useTask } from "../hooks/useTask"
import { useEffect } from "react";
import{ArrowLeft,Pencil,Calendar,Trash2} from 'lucide-react'
import ErrorMessage from "../../../../shared/component/ErrorMessage";


const statusStyles = {
  "Todo": "bg-neutral-100 text-neutral-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Done": "bg-[#A9CB98]/30 text-green-800",
}

const priorityStyles = {
  "Low": "bg-blue-50 text-blue-600",
  "Medium": "bg-orange-50 text-orange-600",
  "High": "bg-red-50 text-red-600",
}

const TaskDetail = () => {

    const {task,viewTask,loading,removeTask,error} = useTask();
    const navigate = useNavigate();
    const {taskId} = useParams()
  

 
    useEffect(() => {

      viewTask(taskId)
    }, [taskId]);
    
  
     const handleEditTask=()=>{
    navigate(`/tasks/${taskId}/edit`)
  }

  const handleDeleteTask = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmed) return;

  try {
    await removeTask(taskId);
    navigate("/");
  } catch (error) {
    // Error is handled in context
  }
};

 if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-400">Loading task...</p>
    </main>
  );
}

if (error) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <ErrorMessage message={error} />
    </main>
  );
}

if (!task) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-400">Task not found.</p>
    </main>
  );
}

 

  return (
    <main className="min-h-screen bg-[#FAFBF9] px-4 sm:px-8 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6"
        >
          <ArrowLeft size={16} />
          Back to tasks
        </button>

      

        {/* Detail card */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 sm:p-8">

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
              {task.title}
            </h1>

            <div className="flex gap-2">
              <span className={`text-xs font-medium rounded-full px-3 py-1.5 ${statusStyles[task.status] || "bg-neutral-100 text-neutral-700"}`}>
                {task.status}
              </span>
              <span className={`text-xs font-medium rounded-full px-3 py-1.5 ${priorityStyles[task.priority] || "bg-neutral-100 text-neutral-700"}`}>
                {task.priority}
              </span>
            </div>
          </div>

          <p className="text-neutral-500 leading-relaxed mt-5">
            {task.description}
          </p>

          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-neutral-400 mt-6 pt-6 border-t border-neutral-100">
              <Calendar size={16} />
              Due {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-8">

            <button
              onClick={handleEditTask}
              className="flex items-center gap-2 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 px-6 py-3 outline-none"
            >
              <Pencil size={15} />
              Edit
            </button>


            <button
            onClick={handleDeleteTask}
              className="flex items-center gap-2 rounded-full border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 px-6 py-3 outline-none"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default TaskDetail