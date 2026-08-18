import React, { useEffect } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTask } from '../hooks/useTask';
import TaskCard from '../components/TaskCArd';
import { useNavigate } from 'react-router';


const Home = () => {

  const { logout, user } = useAuth();
  const { tasks, getTasks,totalTask } = useTask();
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    await logout();
  }

  const handleGetTasks = async () => {
    
    await getTasks();
    
  }

  const handleCreateTask = () =>{
    navigate('tasks/create');
  }


  useEffect(() => {
    getTasks();
  }, [])
  

  

 

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

        <div className="flex gap-3 flex-wrap">

           <button
        onClick={handleCreateTask}
        className="rounded-full border bg-[#A9CB98] text-neutral-900 font-medium hover:bg-[#9bbf88] px-6 py-3 outline-none"
      >
        + Create Task
      </button>
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
          <span className="text-sm text-neutral-400">{totalTask} total</span>
        </div>

        {totalTask === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center text-neutral-400">
            No tasks yet. Click "Refresh Tasks" to load them.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task}/>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}

export default Home