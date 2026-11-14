import server from './server.ts'
import db from './db/connection.ts'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('Running database migrations for production...')
      await db.migrate.latest()
      await db.seed.run()
    }

    server.listen(PORT, () => {
      console.log('Server is listening on port', PORT)
    })
  } catch (error) {
    console.error('Failed to start server and run migrations:', error)
  }
}

startServer()
