import * as Path from 'node:path'
import recipesRoute from '../server/routes/recipes'
import express from 'express'
import storiesRoute from '../server/routes/stories'

const server = express()
server.use(express.json())

server.use('/api/v1/recipes', recipesRoute)
server.use('/api/v1/stories', storiesRoute)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
