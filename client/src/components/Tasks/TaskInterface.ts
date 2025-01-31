export interface Task {
  title: string
  description: string
  deadline: string
  completed: boolean
  important: boolean
  id: string
  status: TaskStatus
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}
