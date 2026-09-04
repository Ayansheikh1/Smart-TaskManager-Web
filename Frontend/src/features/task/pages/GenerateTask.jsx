import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useTask } from '../hooks/useTask';
import { ToastContext } from '../context/toast.context';
import ErrorMessage from '../../../../shared/component/ErrorMessage';

const GenerateTask = () => {

  const [goal, setGoal] = useState("");
  const{generate,error,loading} = useTask();
  const navigate = useNavigate();

  const{showToast} = useContext(ToastContext)

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
    const response = await generate(goal);
    showToast(response.message,"success")
    navigate('/');
    }catch(error){
      // Error is already stored in context
    }


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

          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={20} className="text-[#7fa870]" />
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Generate Task</h1>
          </div>
          <p className="text-neutral-400 text-sm mt-1">
            Describe your goal and let AI turn it into a task for you.
          </p>

          <ErrorMessage message={error}  />

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Goal
              </label>
              <textarea
                name="goal"
                id="goal"
                rows={4}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Learn React fundamentals"
                className="w-full rounded-3xl border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 rounded-full border bg-[#A9CB98] text-neutral-900 font-medium hover:bg-[#9bbf88] py-4 outline-none"
              >
                <Sparkles size={16} />
                {loading?"Generating...":"Generate Task"}
              </button>
                <Link
                        to="/"
                        className={`flex-1 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 font-medium py-4 ${
                    loading
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-neutral-100"
                    }`}>
                                Cancel
                                </Link>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}

export default GenerateTask