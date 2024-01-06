import { useState, FormEvent } from 'react'

import useTasks from '../hooks/useTasks'

export default function NewTaskForm() {
  const { addTask } = useTasks()
  const [newTaskTitle, setNewTaskTitle] = useState('')

  async function handleAddTask(e: FormEvent) {
    e.preventDefault()
    try {
      await addTask(newTaskTitle)
      setNewTaskTitle('')
    } catch (error) {
      alert((error as { message: string }).message)
    }
  }

  return (
    <form className="flex justify-between mb-5" onSubmit={handleAddTask}>
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
  )
}
