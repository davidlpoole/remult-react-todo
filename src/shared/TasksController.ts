import { BackendMethod, EntityFilter, remult } from 'remult'
import { Task } from './Task'

export default class TasksController {
  @BackendMethod({ allowed: true })
  static async setAllCompleted(completed: Task['completed']) {
    const taskRepo = remult.repo(Task)

    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed })
    }
  }

  @BackendMethod({ allowed: true })
  static async deleteAllWhere(where: EntityFilter<Task>) {
    const taskRepo = remult.repo(Task)
    for (const task of await taskRepo.find({ where })) {
      await taskRepo.delete(task)
    }
  }
}
