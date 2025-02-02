import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQueryClient } from 'react-query'
import { FaSignOutAlt, FaPlus } from 'react-icons/fa'
import TaskModal from './Tasks/TaskModal'
import API_ROUTES from '../utils/apiRoutes'

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const [values, setValues] = useState({
    title: '',
    description: '',
    status: '',
    deadline: ''
  })

  const [error, setError] = useState<string | null>(null)

  const closeModal = () => {
    setIsOpen(false)
    setValues({ title: '', description: '', status: '', deadline: '' })
    setError(null)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const { logout } = useAuth0()

  const createTask = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!values.title || !values.description || !values.deadline) {
      setError('Please fill in all fields.')
      return
    }

    try {
      const formattedDateTime = values.deadline + 'T12:00:00Z'
      values.deadline = formattedDateTime

      const res = await fetch(API_ROUTES.CREATE_TASK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (!res.ok) {
        throw new Error('Failed to create task')
      }

      await res.json()
      queryClient.invalidateQueries('tasks')
      closeModal()
    } catch (error) {
      setError('Error creating task. Please try again.')
      console.error('Error creating task:', error)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [id]: value }))
  }

  return (
    <div>
      <div className="mb-2 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
        <div className="col-span-1 flex items-center justify-start">
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search task"
            className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-4 focus:ring-blue-200"
            aria-label="Search tasks"
          />
        </div>

        <div className="col-span-1 flex justify-end sm:col-span-2 md:col-span-4 lg:col-span-3">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={openModal}
              className="flex items-center rounded-md border border-indigo-500 px-4 py-2 text-sm text-indigo-500 hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-indigo-300"
            >
              <FaPlus className="mr-2" /> {/* Add icon before the text */}
              Add Task
            </button>
            <button
              type="button"
              className="flex items-center rounded-md border border-gray-500 px-4 py-2 text-sm text-black hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
              onClick={() => logout()}
              aria-label="Logout"
            >
              <FaSignOutAlt className="mr-1 text-sm" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600">
          <p>{error}</p>
        </div>
      )}

      <TaskModal
        isOpen={isOpen}
        closeModal={closeModal}
        createTask={createTask}
        handleInputChange={handleInputChange}
        values={values}
      />
    </div>
  )
}

export default Header
