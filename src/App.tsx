import { useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from './shared/Task'
import TaskItem from './Components/TaskItem'
import NewTaskForm from './Components/NewTaskForm'

const taskRepo = remult.repo(Task)

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    return taskRepo
      .liveQuery({
        limit: 20,
        orderBy: { createdAt: 'asc' },
        // where: { completed: true },
      })
      .subscribe((info) => setTasks(info.applyChanges))
  }, [])

  return (
    <div>
      <h1 className="text-5xl font-semibold my-5 text-center">Todos</h1>
      <main>
        <NewTaskForm />
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </main>
    </div>
  )
}
