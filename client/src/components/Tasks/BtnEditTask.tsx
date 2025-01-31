import React from 'react'
import { Task } from './TaskInterface'
import { FaEdit } from 'react-icons/fa'
const BtnEditTask: React.FC<{ task: Task }> = ({ task }) => {
  const handleEditTask = () => {
    alert(`Edit Task: ${task.title}`)
  }

  return (
    <>
      <button
        title="Edit task"
        className="grid h-6 w-7 place-items-center transition hover:text-slate-700 sm:size-8 dark:hover:text-slate-200"
        onClick={handleEditTask}
      >
        <FaEdit className="ml-2 w-4 text-blue-400 sm:w-5" />
      </button>
    </>
  )
}

export default BtnEditTask
