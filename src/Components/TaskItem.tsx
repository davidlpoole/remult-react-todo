import useTasks from '../hooks/useTasks'
import { Task } from '../shared/Task'
import { useState } from 'react'

export default function TaskItem({ task }: { task: Task }) {
  const { deleteTask, saveTask } = useTasks()
  const [title, setTitle] = useState(task.title)

  return (
    <div className="flex items-center" key={task.id}>
      <input
        className="mr-5 hover:cursor-pointer w-6 h-6 accent-blue-500"
        type="checkbox"
        checked={task.completed}
        onChange={() => saveTask({ ...task, completed: !task.completed })}
      />
      <input
        className="rounded-lg py-2 px-4 my-2 mr-5 w-56 border border-gray-500 hover:border-blue-500 transition-all duration-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="mr-5 rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 disabled:hover:border-gray-500 transition-all duration-300 disabled:text-gray-300"
        onClick={() => saveTask({ ...task, title })}
        disabled={title == task.title}
      >
        Save
      </button>
      <button
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  )
}
