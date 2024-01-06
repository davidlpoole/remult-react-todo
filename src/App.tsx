import TaskItem from './components/TaskItem'
import NewTaskForm from './components/NewTaskForm'
import useTasks from './hooks/useTasks'

export default function App() {
  const { tasks, setAllCompleted } = useTasks()

  return (
    <div>
      <h1 className="text-5xl font-semibold my-5 text-center">Todos</h1>
      <main>
        <NewTaskForm />
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <div className="flex justify-start gap-5 pt-5 items-center">
          Set all items:
          <button
            className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
            onClick={() => setAllCompleted(true)}
          >
            Complete
          </button>
          <button
            className="rounded-lg bg-gray-100 border border-gray-500 py-2 px-4 hover:border-red-500 transition-all duration-300"
            onClick={() => setAllCompleted(false)}
          >
            Incomplete
          </button>
        </div>
      </main>
    </div>
  )
}
