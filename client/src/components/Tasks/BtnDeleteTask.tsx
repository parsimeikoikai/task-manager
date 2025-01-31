import React from 'react'
import Swal from 'sweetalert2'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { useQueryClient } from 'react-query'
import { Task } from './TaskInterface'
import API_ROUTES from '../../utils/apiRoutes'

const BtnDeleteTask: React.FC<{ task: Task }> = ({ task }) => {
  const queryClient = useQueryClient()

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(API_ROUTES.DELETE_TASK(taskId), {
        method: 'DELETE'
      })

      if (res.ok) {
        queryClient.invalidateQueries('tasks')
        Swal.fire('Deleted!', 'The task has been deleted.', 'success')
      } else {
        Swal.fire('Error', 'Failed to delete the task.', 'error')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      Swal.fire('Error', 'Something went wrong!', 'error')
    }
  }

  const handleDeleteTask = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the task: "${task.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task.id)
      }
    })
  }

  return (
    <button
      title="Delete task"
      className="grid h-6 w-7 place-items-center transition hover:text-slate-700 sm:size-8 dark:hover:text-slate-200"
      onClick={handleDeleteTask}
    >
      <RiDeleteBin6Fill className="ml-2 w-4 text-red-400 sm:w-5" />
    </button>
  )
}

export default BtnDeleteTask
