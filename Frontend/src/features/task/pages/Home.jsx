import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTask } from '../hooks/useTask';

const Home = () => {

  const { logout, user } = useAuth();
  const { tasks, getTasks } = useTask();

  const handleLogout = async (e) => {
    await logout();
  }

  const handleGetTasks = async () => {
    await getTasks();
  }

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

  return (
    <main className="min-h-screen bg-[#FAFBF9] px-4 sm:px-8 py-8">

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Welcome, {user?.username}!
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Here's what's on your plate today.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGetTasks}
            className="rounded-full border bg-neutral-900 text-white font-medium hover:bg-neutral-800 px-6 py-3 outline-none"
          >
            Refresh Tasks
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 px-6 py-3 outline-none"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tasks section */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-neutral-900">Tasks</h2>
          <span className="text-sm text-neutral-400">{tasks.length} total</span>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center text-neutral-400">
            No tasks yet. Click "Refresh Tasks" to load them.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
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
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}

export default Home