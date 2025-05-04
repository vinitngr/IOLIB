console.time("dependency laoding...")

import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import connectDB from './configs/db'

console.timeEnd("dependency laoding...")
console.time("⏱ Total Startup Time")

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

if (process.env.ENV === 'production') {
  const clientpath = path.resolve(__dirname, '../../client/dist')
  app.use(express.static(clientpath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientpath, 'index.html'))
  })
}

console.time("⏱ Route setup")

app.use('/api/auth', async (req, res, next) => {
  const { default: authRoute } = await import('./routes/auth.route')
  return authRoute(req, res, next)
})

app.use('/api/add', async (req, res, next) => {
  const { default: addRoute } = await import('./routes/add.route')
  return addRoute(req, res, next)
})

app.use('/api/chat', async (req, res, next) => {
  const chatRoute = (await import('./routes/chat.route')).default
  return chatRoute(req, res, next)
})

app.use('/api/get', async (req, res, next) => {
  const { default : getRoute } = await import('./routes/get.route')
  return getRoute(req, res, next)
})

console.timeEnd("⏱ Route setup")

app.get('/test', (req, res) => {
  res.send('testing...')
})

const port: number = Number(process.env.PORT) || 3000
app.listen(port, "0.0.0.0", () => {
  connectDB()
  console.timeEnd("⏱ Total Startup Time")
  console.log(`✅ Server running at: http://localhost:${port}`)
})


//decrease down server startup time from 12s to 1.6s - using dynamic import 