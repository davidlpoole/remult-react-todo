import { useEffect, useState } from 'react'
import { EntityFilter, remult } from 'remult'

import { Task } from '../shared/Task'
import TasksController from '../shared/TasksController'

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const taskRepo = remult.repo(Task)

  useEffect(() => {
    return taskRepo
      .liveQuery({
        limit: 20,
        page: 1,
        orderBy: { createdAt: 'asc' },
        // where: { completed: true },
      })
      .subscribe((info) => setTasks(info.applyChanges))
  }, [taskRepo])

  return {
    tasks,

    addTask: async (title: Task['title']) => {
      try {
        await taskRepo.insert({ title })
      } catch (error) {
        alert((error as { message: string }).message)
      }
    },

    saveTask: async (task: Task): Promise<void> => {
      try {
        await taskRepo.save(task)
      } catch (error) {
        alert((error as { message: string }).message)
      }
    },

    deleteTask: async (id: Task['id']): Promise<void> => {
      try {
        await taskRepo.delete(id)
      } catch (error) {
        alert((error as { message: string }).message)
      }
    },

    setAllCompleted: async (completed: Task['completed']): Promise<void> => {
      await TasksController.setAllCompleted(completed)
    },

    deleteAllWhere: async (where: EntityFilter<Task>): Promise<void> => {
      await TasksController.deleteAllWhere(where)
    },
  }
}
