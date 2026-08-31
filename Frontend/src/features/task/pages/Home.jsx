import React, { useEffect, useState,useContext } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTask } from '../hooks/useTask';
import TaskCard from '../components/TaskCArd';
import { useNavigate } from 'react-router';
import ErrorMessage from '../../../../shared/component/ErrorMessage';
import { LayoutGrid, ListTodo, Clock, CheckCircle2, AlertCircle, CalendarClock, CalendarCheck, CalendarDays } from 'lucide-react'
import { ToastContext } from '../context/toast.context';


const Home = () => {

  const { logout, user } = useAuth();
  const { tasks, getTasks,totalTask,error,loading } = useTask();
  const navigate = useNavigate()

    const{showToast} = useContext(ToastContext);

//filtering state
  const[search,setSearch]=useState("");
  const[statusFilter,setStatusFilter] = useState('All');
  const[priorityFilter,setPriorityFilter] = useState('All');
  

  //sorting state
  const[sort,setSort] = useState("Default");


  

  const handleLogout = async (e) => {
    const response = await logout();
    
    showToast(response.message,"success")
  }

  const handleGetTasks = async () => {
  try {
    const response = await getTasks();
    
    showToast(response.message,"success");
  } catch (error) {
    // Error is already handled in TaskContext
  }
};

  const handleCreateTask = () =>{
    navigate('tasks/create');
  }

  const handleRemovingFilters = () =>{
    setSearch("");
    setStatusFilter("All")
    setPriorityFilter("All")
    setSort("Default")

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






//pagination state
  const[currentPage,setCurrentPage] = useState(1);
  const tasksPerPage = 6


  let startIndex = (currentPage-1) * tasksPerPage;
  let endIndex = currentPage * tasksPerPage; //withdraw indexes for slicing array

  const currentTasks = sortedTasks.slice(startIndex,endIndex); // slice the sortedTask to shown only 6 task per page


  const totalPages = Math.ceil(sortedTasks.length/tasksPerPage); //count total pages required to shown on display 



  const handlePreviousButton = () =>{
    if(currentPage > 1){
      return setCurrentPage(currentPage-1)
    }
  }

  const handleNextButton = () =>{
    if(currentPage<totalPages){
      return setCurrentPage(currentPage+1)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search,priorityFilter,statusFilter,sort])
  



//statistics
let totalTodo = 0;
let inProgress = 0;
let completed = 0;
let highPriority = 0;

let overdue =0;
let dueToday = 0;
let upcoming = 0;

const today = new Date().setHours(0,0,0,0);

  for(let i = 0;i<tasks.length;i++){
    if(tasks[i].status==="Todo"){
      totalTodo++;
    }
    if(tasks[i].status==="In Progress"){
      inProgress++;
    }
    if(tasks[i].status==="Completed"){
      completed++;
    }
    if(tasks[i].priority==="High"){
      highPriority++;
    }


     const dueDate = new Date(tasks[i].dueDate).setHours(0,0,0,0);
    if(dueDate < today){
      overdue++
    }else if(dueDate === today){
      dueToday++
    }else{
      upcoming++
    }


}


  














  

 

  return (
  <main className="min-h-screen bg-[#FAFBF9] px-4 sm:px-8 py-8">

    {/* Top bar */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto mb-8">
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
          className="rounded-full border bg-neutral-900 text-white font-medium hover:bg-neutral-800 px-6 py-3 outline-none disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh Tasks"}
        </button>
        <button
          onClick={handleLogout}
          className="rounded-full border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 px-6 py-3 outline-none"
        >
          Logout
        </button>
      </div>
    </div>



<div className="max-w-5xl mx-auto mb-8">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
        <LayoutGrid size={18} className="text-neutral-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">Total Tasks</p>
        <p className="text-xl font-bold text-neutral-900">{totalTask}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
        <ListTodo size={18} className="text-neutral-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">Todo</p>
        <p className="text-xl font-bold text-neutral-900">{totalTodo}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <Clock size={18} className="text-amber-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">In Progress</p>
        <p className="text-xl font-bold text-neutral-900">{inProgress}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#A9CB98]/30 flex items-center justify-center shrink-0">
        <CheckCircle2 size={18} className="text-green-700" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">Completed</p>
        <p className="text-xl font-bold text-neutral-900">{completed}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
        <AlertCircle size={18} className="text-red-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">High Priority</p>
        <p className="text-xl font-bold text-neutral-900">{highPriority}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
        <CalendarClock size={18} className="text-red-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">Overdue</p>
        <p className="text-xl font-bold text-neutral-900">{overdue}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <CalendarCheck size={18} className="text-amber-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">Due Today</p>
        <p className="text-xl font-bold text-neutral-900">{dueToday}</p>
      </div>
    </div>

    <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <CalendarDays size={18} className="text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">Upcoming</p>
        <p className="text-xl font-bold text-neutral-900">{upcoming}</p>
      </div>
    </div>

  </div>
</div>

    {/* Error message */}
    {error && (
      <div className="max-w-5xl mx-auto mb-6">
        <ErrorMessage message={error} />
      </div>
    )}

    {/* Toolbar: search + filters + sort, grouped in one card */}
    <div className="max-w-5xl mx-auto mb-8 bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 space-y-4">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full rounded-full border border-neutral-300 px-6 py-3 text-neutral-700 outline-none focus:border-neutral-900"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="flex-1 rounded-full border border-neutral-300 px-6 py-3 text-neutral-700 outline-none focus:border-neutral-900 bg-white"
        >
          <option value="Default">Default</option>
          <option value="Newest first">Newest first</option>
          <option value="Oldest first">Oldest first</option>
          <option value="Due date: nearest first">Due date: nearest first</option>
          <option value="Due date: latest first">Due date: latest first</option>
          <option value="Priority: High → Low">Priority: High → Low</option>
        </select>

        <button
          type="button"
          onClick={handleRemovingFilters}
          className="shrink-0 rounded-full border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 px-6 py-3 outline-none"
        >
          Clear Filters
        </button>
      </div>

    </div>

    {/* Tasks section */}
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-neutral-900">Tasks</h2>
        <span className="text-sm text-neutral-400">{sortedTasks.length} total</span>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-neutral-200 p-10 text-center">
          <p className="text-neutral-400">Loading tasks...</p>
        </div>
      ) : currentTasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center text-neutral-400">
          No matching tasks found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>

          {/* Pagination — moved outside the grid so it doesn't act like a card */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousButton}
              className="rounded-full border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 px-6 py-3 outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-sm text-neutral-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={handleNextButton}
              className="rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 px-6 py-3 outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>

  </main>
)
}


export default Home