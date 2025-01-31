const API_BASE_URL = 'http://localhost:8080/api/v1'

const API_ROUTES = {
  CREATE_TASK: `${API_BASE_URL}/createTask`,
  GET_ALL_TASKS: `${API_BASE_URL}/getall`,
  DELETE_TASK: (id: string) => `${API_BASE_URL}/deleteTask/${id}`
}

export default API_ROUTES
