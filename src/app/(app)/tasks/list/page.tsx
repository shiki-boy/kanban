import TasksList from '../components/TasksList'
import { columns } from '../components/TasksList/columns'

function Tasks() {
  const tasks = [
    {
      id: '1',
      label: 'feature',
      priority: 'medium',
      status: 'todo',
      title: 'Task 1',
    },
    {
      id: '2',
      label: 'feature',
      priority: 'medium',
      status: 'todo',
      title: 'Task 2',
    },
    {
      id: '3',
      label: 'feature',
      priority: 'medium',
      status: 'todo',
      title: 'Task 3',
    },
    {
      id: '4',
      label: 'feature',
      priority: 'medium',
      status: 'todo',
      title: 'Task 4',
    },
  ]

  return (
    <TasksList data={ tasks } columns={ columns } />
  )
}

export default Tasks