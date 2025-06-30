const express = require('express')
const cors = require('cors')
const { db, initDatabase } = require('./db')

const app = express()

// Middleware
app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Parse JSON request bodies

// Initialize database when server starts
initDatabase()

// REST API Endpoints

// GET /tasks - List all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db('tasks').select('*').orderBy('created_at', 'desc')
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// GET /tasks/:id - Get a specific task
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await db('tasks').where('id', req.params.id).first()
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    res.status(500).json({ error: 'Failed to fetch task' })
  }
})

// POST /tasks - Create new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, assignee } = req.body
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const [newTask] = await db('tasks').insert({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      assignee
    }).returning('*')

    res.status(201).json(newTask)
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// PUT /tasks/:id - Update task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, status, priority, assignee } = req.body
    
    const updatedTask = await db('tasks')
      .where('id', req.params.id)
      .update({
        title,
        description,
        status,
        priority,
        assignee,
        updated_at: new Date()
      })
      .returning('*')

    if (updatedTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json(updatedTask[0])
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ error: 'Failed to update task' })
  }
})

// DELETE /tasks/:id - Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await db('tasks')
      .where('id', req.params.id)
      .del()
      .returning('*')

    if (deletedTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

// Keep the original test endpoint for compatibility
app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

