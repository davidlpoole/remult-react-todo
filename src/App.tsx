import useTasks from './hooks/useTasks'
import NewTaskForm from './components/NewTaskForm'
import TaskItem from './components/TaskItem'
import SetAllCompleted from './components/SetAllCompleted'
import DeleteAll from './components/DeleteAll'

export default function App() {
  const { tasks } = useTasks()

  return (
    <div>
      <h1 className="text-5xl font-semibold my-5 text-center">Tasks</h1>
      <main>
        <NewTaskForm />
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <SetAllCompleted />
        <DeleteAll />
      </main>
    </div>
  )
}
