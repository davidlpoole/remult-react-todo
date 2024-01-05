import { remult } from 'remult'
import { Task } from '../shared/Task'
import { useState } from 'react'

const taskRepo = remult.repo(Task)

export default function TaskItem({ task }: { task: Task }) {
  const [title, setTitle] = useState(task.title)

  async function setCompleted(completed: boolean) {
    await taskRepo.save({ ...task, completed })
  }

  async function saveTask() {
    try {
      await taskRepo.save({ ...task, title })
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="mr-5 rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 disabled:hover:border-gray-500 transition-all duration-300 disabled:text-gray-300"
        onClick={saveTask}
        disabled={title == task.title}
      >
        Save
      </button>
      <button
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
        onClick={deleteTask}
      >
        Delete
      </button>
    </div>
  )
}
