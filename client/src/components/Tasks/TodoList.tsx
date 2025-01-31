import TaskItem from '../Tasks/TaskItem'
import { useQuery } from 'react-query'
import Header from '../Header'
import { useState } from 'react'
import API_ROUTES from '../../utils/apiRoutes'
import { Task } from './TaskInterface'

export default function Todolist() {
  const [searchQuery, setSearchQuery] = useState('')
  const getTasks = async () => {
    const res = await fetch(API_ROUTES.GET_ALL_TASKS)
    return res.json()
  }

  const { data, error, isLoading } = useQuery('tasks', getTasks)

  if (error) return <div>Request Failed</div>
  if (isLoading) return <div>Loading...</div>

  const filteredTasks = data?.filter((task: Task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="m-auto mt-8 min-h-screen px-4 pb-8 pt-5 sm:px-6 sm:pb-16 md:px-8">
      <Header setSearchQuery={setSearchQuery} />
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="flex items-center justify-center text-center text-xl text-gray-500">
            <span role="img" aria-label="No data" className="mr-2">
              🚫
            </span>
            No data available
          </div>
        )}
      </ul>
    </div>
  )
}
