import React from 'react'
import { Task, TaskStatus } from './TaskInterface'
import Actions from './Actions'
import { formatDate } from './DateFormatter'

const InfoTask: React.FC<{ task: Task }> = ({ task }) => {
  const getStatusClass = () => {
    switch (task.status) {
      case TaskStatus.TODO:
        return 'text-white bg-blue-500 hover:bg-blue-600'
      case TaskStatus.IN_PROGRESS:
        return 'text-white bg-gray-500 hover:bg-gray-600'
      case TaskStatus.COMPLETED:
        return 'text-white bg-green-500 hover:bg-green-600'
      default:
        return ''
    }
  }

  return (
    <div className="mr-6 flex flex-1 flex-col space-y-4 rounded-xl bg-white p-6 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-gray-800 dark:text-slate-200">
          {task.title}
        </span>
      </div>

      <div className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
        {task.description.length > 100
          ? `${task.description.substring(0, 100)}...`
          : task.description}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-300">
        <span>{formatDate(task.deadline)}</span>
        <Actions task={task} />
      </div>

      <div className="flex items-center justify-end">
        <span
          className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold leading-none shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${getStatusClass()}`}
        >
          {task.status}
        </span>
      </div>
    </div>
  )
}

export default InfoTask
