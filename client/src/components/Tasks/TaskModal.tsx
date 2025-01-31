import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface TaskModalProps {
  isOpen: boolean
  closeModal: () => void
  createTask: (event: React.FormEvent) => void
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  values: {
    title: string
    description: string
    status: string
    deadline: string
  }
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  closeModal,
  createTask,
  handleInputChange,
  values
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="z-50 w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Task
                </Dialog.Title>
                <form onSubmit={createTask} className="mt-4 space-y-6">
                  <div className="rounded-md border-2 border-gray-200 p-4">
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      placeholder="Title"
                      value={values.title}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      required
                      placeholder="Enter description here..."
                      value={values.description}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      required
                      value={values.status}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>

                    <label
                      htmlFor="deadline"
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      required
                      value={values.deadline}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex items-center rounded-lg border border-gray-300 px-4 py-3 text-lg text-black"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-md border border-indigo-500 px-4 py-2 text-sm text-indigo-500 hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-indigo-300"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TaskModal
