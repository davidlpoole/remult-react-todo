import { FormEvent, useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from './shared/Task'

const taskRepo = remult.repo(Task)

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
    taskRepo
      .find({
        limit: 20,
        orderBy: { createdAt: 'asc' },
        // where: { completed: true },
      })
      .then(setTasks)
  }, [])

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle })
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
    } catch (error) {
      alert((error as { message: string }).message)
    }
  }

  return (
    <div>
      <h1 className="text-4xl my-5">Todos</h1>
      <main>
        <form className="mb-5" onSubmit={addTask}>
          <input
            className="rounded-lg border py-2 px-4 mr-5 hover:border-blue-500"
            type="text"
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button className="rounded-lg border py-2 px-4 hover:border-blue-500">
            Add
          </button>
        </form>
        {tasks.map((task) => {
          function setTask(value: Task) {
            setTasks((tasks) => tasks.map((t) => (t === task ? value : t)))
          }

          async function setCompleted(completed: boolean) {
            setTask(await taskRepo.save({ ...task, completed }))
          }

          return (
            <div className="flex items-center" key={task.id}>
              <input
                className="mr-5 h-5 w-5 my-2"
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <span>{task.title}</span>
            </div>
          )
        })}
      </main>
    </div>
  )
}
