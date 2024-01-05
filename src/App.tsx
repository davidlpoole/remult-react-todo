import { FormEvent, useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from './shared/Task'

const taskRepo = remult.repo(Task)

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
    return taskRepo
      .liveQuery({
        limit: 20,
        orderBy: { createdAt: 'asc' },
        // where: { completed: true },
      })
      .subscribe((info) => setTasks(info.applyChanges))
  }, [])

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      await taskRepo.insert({ title: newTaskTitle })
      setNewTaskTitle('')
    } catch (error) {
      alert((error as { message: string }).message)
    }
  }

  return (
    <div>
      <h1 className="text-5xl font-semibold my-5 text-center">Todos</h1>
      <main>
        <form className="flex justify-between mb-5" onSubmit={addTask}>
          <input
            className="rounded-lg w-full py-2 px-4 mr-5 border border-gray-500 hover:border-blue-500 transition-all duration-300"
            type="text"
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 transition-all duration-300">
            Add
          </button>
        </form>
        {tasks.map((task) => {
          function setTask(value: Task) {
            setTasks((tasks) => tasks.map((t) => (t === task ? value : t)))
          }

          async function setCompleted(completed: boolean) {
            await taskRepo.save({ ...task, completed })
          }

          function setTitle(title: string) {
            setTask({ ...task, title })
          }

          async function saveTask() {
            try {
              await taskRepo.save(task)
            } catch (error) {
              alert((error as { message: string }).message)
            }
          }

          async function deleteTask() {
            try {
              await taskRepo.delete(task)
            } catch (error) {
              alert((error as { message: string }).message)
            }
          }

          return (
            <div className="flex items-center" key={task.id}>
              <input
                className="mr-5 hover:cursor-pointer w-6 h-6 accent-blue-500"
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <input
                className="rounded-lg py-2 px-4 my-2 mr-5 w-56 border border-gray-500 hover:border-blue-500 transition-all duration-300"
                value={task.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="mr-5 rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 transition-all duration-300"
                onClick={saveTask}
              >
                Save
              </button>
              <button
                className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 transition-all duration-300"
                onClick={deleteTask}
              >
                Delete
              </button>
            </div>
          )
        })}
      </main>
    </div>
  )
}
