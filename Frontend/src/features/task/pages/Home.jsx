import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTask } from '../hooks/useTask';
import TaskCard from '../components/TaskCArd';
import { useNavigate } from 'react-router';
import ErrorMessage from '../../../../shared/component/ErrorMessage';


const Home = () => {

  const { logout, user } = useAuth();
  const { tasks, getTasks,totalTask,error,loading } = useTask();
  const navigate = useNavigate()


  const[search,setSearch]=useState("");
  const[statusFilter,setStatusFilter] = useState('All');
  const[priorityFilter,setPriorityFilter] = useState('All');
  

  const handleLogout = async (e) => {
    await logout();
  }

  const handleGetTasks = async () => {
  try {
    await getTasks();
  } catch (error) {
    // Error is already handled in TaskContext
  }
};

  const handleCreateTask = () =>{
    navigate('tasks/create');
  }


  useEffect(() => {
  const loadTasks = async () => {
    try {
      await getTasks();
    } catch (error) {
      // Error is already stored in context
    }
  };

  loadTasks();
}, []);
  
// Filter tasks by search text, selected status, and priority; only tasks matching all conditions are included
  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter == 'All' || task.status == statusFilter

    const matchesPriority = priorityFilter == 'All' || task.priority == priorityFilter

    return matchesTitle && matchesPriority && matchesStatus

  });

 

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
            disabled={loading}
            className="rounded-full border bg-neutral-900 text-white font-medium hover:bg-neutral-800 px-6 py-3 outline-none"
          >
           {loading?"Refreshing...": "Refresh Tasks"}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 px-6 py-3 outline-none"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-6">
  <ErrorMessage message={error} />
</div>


<div className="max-w-5xl mx-auto mb-6">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search tasks..."
    className="w-full rounded-full border border-neutral-300 px-6 py-3 text-neutral-700 outline-none focus:border-neutral-900"
  />
</div>

<div className="max-w-5xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="rounded-full border border-neutral-300 px-6 py-3 text-neutral-700 outline-none focus:border-neutral-900 bg-white"
  >
    <option value="All">All Status</option>
    <option value="Todo">Todo</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="rounded-full border border-neutral-300 px-6 py-3 text-neutral-700 outline-none focus:border-neutral-900 bg-white"
  >
    <option value="All">All Priority</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>

</div>

      {/* Tasks section */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-neutral-900">Tasks</h2>
          <span className="text-sm text-neutral-400">{totalTask} total</span>
        </div>

        

        {
        loading?(
              <div className="rounded-3xl border border-neutral-200 p-10 text-center">
      <p className="text-neutral-400">
        Loading tasks...
      </p>
    </div>

        ): filteredTasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center text-neutral-400">
            No matching tasks found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task}/>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}

export default Home