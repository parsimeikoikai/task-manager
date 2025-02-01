const API_BASE_URL = 'http://localhost:8080/api/v1'

const API_ROUTES = {
  CREATE_TASK: `${API_BASE_URL}/tasks`,
  GET_ALL_TASKS: `${API_BASE_URL}/tasks`,
  DELETE_TASK: (id: string) => `${API_BASE_URL}/tasks/${id}`
}

export default API_ROUTES
