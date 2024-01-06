import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'

import { api } from './api'

const app = express()

app.use(helmet())
app.use(compression())
app.use(api)

const __dirname = path.resolve('./')
app.use(express.static(path.resolve(__dirname, '../')))
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'))
})

app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
