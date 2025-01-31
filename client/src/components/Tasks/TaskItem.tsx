import React from 'react'
import { Task } from './TaskInterface'
import InfoTask from './InfoTask'

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div key={task.id} className="mt-4">
      <div
        className={`flex flex-row rounded-lg border-2 border-gray-300 bg-slate-100 p-5 text-left transition-all duration-300
  ease-in-out hover:shadow-lg hover:shadow-slate-300 sm:p-6 dark:border-gray-700 dark:bg-slate-800 dark:text-white dark:hover:shadow-transparent`}
      >
        <InfoTask task={task} />
      </div>
    </div>
  )
}

export default React.memo(TaskItem)
