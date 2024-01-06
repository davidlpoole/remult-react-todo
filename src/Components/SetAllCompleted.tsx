import useTasks from '../hooks/useTasks'

export default function SetAllCompleted() {
  const { setAllCompleted } = useTasks()

  return (
    <div className="flex justify-start gap-5 pt-5 items-center">
      Set all items:
      <button
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 transition-all duration-300"
        onClick={() => setAllCompleted(true)}
      >
        Complete
      </button>
      <button
        className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-blue-500 transition-all duration-300"
        onClick={() => setAllCompleted(false)}
      >
        Incomplete
      </button>
    </div>
  )
}
