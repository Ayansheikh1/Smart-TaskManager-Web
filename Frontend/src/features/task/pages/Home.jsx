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

//filtering state
  const[search,setSearch]=useState("");
  const[statusFilter,setStatusFilter] = useState('All');
  const[priorityFilter,setPriorityFilter] = useState('All');
  

  //sorting state
  const[sort,setSort] = useState("Default");

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

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter

    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter

    return matchesTitle && matchesPriority && matchesStatus

  });

  const copy = [...filteredTasks]; //copy array using spread operator

  const priorityOrder = {
    High:3,
    Medium:2,
    Low:1
  } //set priority order and change high,low,medium into numbers to sort them

  const sortedTasks = copy.sort((a,b)=>{
    if(sort ==="Newest first") 
      return new Date(b.createdAt)  - new Date(a.createdAt)

    if(sort ==="Oldest first") 
      return new Date(a.createdAt)  - new Date(b.createdAt)



    if(sort ==="Due date: nearest first") 
      return new Date(a.dueDate)  - new Date(b.dueDate) 

    if(sort ==="Due date: latest first") 
      return new Date(b.dueDate)  - new Date(a.dueDate)    


    if(sort==="Priority: High → Low")
      return priorityOrder[b.priority] -priorityOrder[a.priority]

     return 0; //Default: keep the current order

  }) //sorting the filtered task according to options


  

 

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

<div className='max-w-5xl mx-auto mb-6'>
  <select 
 value={sort}
  onChange={(e) => setSort(e.target.value)}
  className='w-full rounded-full border border-neutral-300 px-6 py-3 text-neutral-700 outline-none focus:border-neutral-900 bg-white' 
  >
<option value="Default">Default</option>
<option value="Newest first">Newest first</option>
<option value="Oldest first">Oldest first</option>
<option value="Due date: nearest first">Due date: nearest first</option>
<option value="Due date: latest first">Due date: latest first</option>
<option value="Priority: High → Low">Priority: High → Low</option>



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

        ): sortedTasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center text-neutral-400">
            No matching tasks found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedTasks.map((task) => (
              <TaskCard key={task._id} task={task}/>
            ))}
          </div>
        )}
      </div>

    </main>
  )
}

export default Home