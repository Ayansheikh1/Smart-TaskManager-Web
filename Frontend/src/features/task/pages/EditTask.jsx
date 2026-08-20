import React from 'react'
import { useTask } from '../hooks/useTask'
import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react'
import { useState ,useEffect} from 'react';

const EditTask = () => {

    
    const[title,setTitle] =useState('');
       const [description, setDescription] = useState("")
       const [status, setStatus] = useState('Todo')
       const [priority, setPriority] = useState('Low')
       const [dueDate, setDueDate] = useState("");


    const {task,loading,viewTask} = useTask();
    const {taskId} = useParams();

    useEffect(() => {
      viewTask(taskId)
    }, [taskId])
    

    useEffect(() => {
        if(task){
        setTitle(task.title);
        setDescription(task.description)
        setStatus(task.status);
        setPriority(task.priority)

         if(task.dueDate){
            setDueDate(task.dueDate.split('T')[0])
        }
        }
       
    }, [task])
    

      


    if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-400">Updating task.......</p>
      </main>
    )
  }
    


  return (

     <main className="min-h-screen bg-[#FAFBF9] px-4 sm:px-8 py-10">
      <div className="max-w-xl mx-auto">

        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 w-fit"
        >
          <ArrowLeft size={16} />
          Back to tasks
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 sm:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Update Task</h1>
          <p className="text-neutral-400 text-sm mt-1">Fill in the details below to update your task.</p>

          <form className="mt-8 space-y-5" 
        //   onSubmit={handleSubmit}
          >

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1.5" 
              
              >
                Title
              </label>
              <input
              onChange={(e)=>{setTitle(e.target.value)}}
              value={title}
                type="text"
                name="title"
                id="title"
                placeholder="Enter task title"
                className="w-full rounded-full border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Description
              </label>
              <textarea
              onChange={(e)=>{setDescription(e.target.value)}}
              value={description}
                name="description"
                id="description"
                rows={4}
                placeholder="Enter task description"
                className="w-full rounded-3xl border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Status
                </label>
                <select
                onChange={(e)=>{setStatus(e.target.value)}}
                value={status}
                  name="status"
                  id="status"
                  className="w-full rounded-full border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900 bg-white"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Priority
                </label>
                <select
                onChange={(e)=>{setPriority(e.target.value)}}
                value={priority}
                  name="priority"
                  id="priority"
                  className="w-full rounded-full border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900 bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Due Date
              </label>
              <input
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
                type="date"
                name="dueDate"
                id="dueDate"
                className="w-full rounded-full border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-full border bg-neutral-900 text-white font-medium hover:bg-neutral-800 py-4 outline-none"
              >
                Update Task
              </button>
              <Link
                to="/"
                className="flex-1 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 py-4 outline-none"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </main>
    
  )
}

export default EditTask
