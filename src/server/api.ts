import { remultExpress } from 'remult/remult-express'
import { createPostgresDataProvider } from 'remult/postgres'

import { Task } from '../shared/Task'
import TasksController from '../shared/TasksController'

export const api = remultExpress({
  entities: [Task],
  controllers: [TasksController],
  dataProvider: process.env['DATABASE_URL']
    ? createPostgresDataProvider({
        connectionString: process.env['DATABASE_URL'],
      })
    : undefined, // Revert to JSON
})
