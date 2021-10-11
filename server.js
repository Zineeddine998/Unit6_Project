const express = require("express")
const cors = require("cors")
const lowDb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const bodyParser = require("body-parser")
const { nanoid } = require("nanoid")

const db = lowDb(new FileSync('db.json'))

db.defaults({ todos: [] }).write()

const app = express()

app.use(cors())
app.use(bodyParser.json())

const PORT = 3000;

app.get('/todos', (req, res) => {
  const data = db.get("todos").value()
  return res.json(data)
})

app.post('/todos', (req, res) => {
  const todo = req.body
  db.get("todos").push({
    ...todo, id: nanoid()
  }).write()
  res.json({ success: true })
})

app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`)
})