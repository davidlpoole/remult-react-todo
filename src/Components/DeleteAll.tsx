import useTasks from '../hooks/useTasks'

export default function DeleteAll() {
  const { deleteAllWhere } = useTasks()

  return (
    <div className="flex justify-start gap-5 pt-5 items-center">
      Delete:
      <button
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
        onClick={() => deleteAllWhere({})}
      >
        All
      </button>
      <button
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
        onClick={() => deleteAllWhere({ completed: true })}
      >
        Complete
      </button>
    </div>
  )
}
