import React from 'react'
import { Task } from './TaskInterface'
import BtnEditTask from './BtnEditTask'
import BtnDeleteTask from './BtnDeleteTask'

const ActionsTaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <>
      <div
        className={`ml-2 flex items-center border-dashed border-slate-200 dark:border-slate-700/[.3]`}
      >
        <BtnDeleteTask task={task} />
        <BtnEditTask task={task} />
      </div>
    </>
  )
}

export default ActionsTaskItem
