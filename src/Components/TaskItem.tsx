import { FormEvent, useState } from 'react'
import useTasks from '../hooks/useTasks'
import { Task } from '../shared/Task'

export default function TaskItem({ task }: { task: Task }) {
  const { deleteTask, saveTask } = useTasks()
  const [isTextEdited, setIsTextEdited] = useState(false)

  async function handleSaveTitle(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get('title') as string
    try {
      await saveTask({ ...task, title })
      setIsTextEdited(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex items-center"
      key={task.id}
      onSubmit={handleSaveTitle}
    >
      <input
        className="mr-5 hover:cursor-pointer w-6 h-6 accent-blue-500"
        type="checkbox"
        checked={task.completed}
        onChange={() => saveTask({ ...task, completed: !task.completed })}
      />
      <input
        name="title"
        key={task.title}
        className="rounded-lg py-2 px-4 my-2 mr-5 w-56 border border-gray-500 hover:border-blue-500 transition-all duration-300"
        defaultValue={task.title}
        onChange={() => setIsTextEdited(true)}
      />
      <button
        type="submit"
        className="mr-5 rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 disabled:hover:border-gray-500 transition-all duration-300 disabled:text-gray-300"
        disabled={!isTextEdited}
      >
        Save
      </button>
      <button
        type="button"
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </form>
  )
}
