
import { useNavigate } from 'react-router';



const statusStyles = {
  "Todo": "bg-neutral-100 text-neutral-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Completed": "bg-[#A9CB98]/30 text-green-800",
}

const priorityStyles = {
  "Low": "bg-blue-50 text-blue-600",
  "Medium": "bg-orange-50 text-orange-600",
  "High": "bg-red-50 text-red-600",
}

const TaskCard = ({ task }) => {

   
    const navigate = useNavigate()

    const handleViewTask = () =>{
        navigate(`/tasks/${task._id}`)
    }


    

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">

      <h3 className="font-semibold text-neutral-900 text-lg leading-snug">
        {task.title}
      </h3>

      <p className="text-neutral-500 text-sm leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className={`text-xs font-medium rounded-full px-3 py-1 ${statusStyles[task.status] || "bg-neutral-100 text-neutral-700"}`}>
          {task.status}
        </span>
        <span className={`text-xs font-medium rounded-full px-3 py-1 ${priorityStyles[task.priority] || "bg-neutral-100 text-neutral-700"}`}>
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <p className="text-xs text-neutral-400 mt-1">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <button
      onClick={handleViewTask}
    className="mt-3 w-full rounded-full border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-100 py-2.5 outline-none"
>
    View
  </button>

    </div>
  )
}

export default TaskCard