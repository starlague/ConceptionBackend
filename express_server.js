const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

let tasks = [
  {
    id: 1,
    title: 'Faire les courses',
    description: 'Acheter du pain et du lait',
    isDone: false
  },
  {
    id: 2,
    title: 'Sortir les poubelles',
    description: 'Mettre les poubelles devant la maison',
    isDone: true
  }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>bonjour html</h1></body></html>')
})

app.get('/some-json', (req, res) => {
  const user = {
    age: 22,
    nom: 'Jane'
  }
  res.json(user)
})

app.get('/transaction', (req, res) => {
  res.json([100, 2000, 3000])
})

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`)
})

app.get('/test-request', (req, res) => {
  console.log('--- HEADERS ---')
  console.log(req.headers)

  console.log('--- BODY ---')
  console.log(req.body)

  res.send('Regarde le terminal pour voir les résultats !')
})

app.get('/exo-query-string', (req, res) => {
  console.log('Query params :', req.query)

  const age = req.query.age
  if (age) {
    res.send(`<h1>L'âge de la personne est : ${age}</h1>`)
  } else {
    res.send('<h1>hello</h1>')
  }
})

app.get('/get-user/:userId', (req, res) => {
  const id = req.params.userId
  
  res.send(`<h1>L'ID utilisateur est : ${id}</h1>`)
})

// to-do list
app.post('/data', (req, res) => {
    console.log('Contenuede req.body :', req.body)
    res.json(req.body)
})

app.get('/tasks', (req, res) => {
    res.json(tasks)
})
app.post('/new-task', (req, res) => {
  const { title, description, isDone } = req.body

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title || '',
    description: description || '',
    isDone: typeof isDone === 'boolean' ? isDone : false
  }

  tasks.push(newTask)
  res.status(201).json({ message: 'Tâche ajoutée avec succès', task: newTask })
})
app.put('/update-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === taskId)

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tâche non trouvée' })
  }

  const { title, description, isDone } = req.body

  if (title !== undefined) tasks[taskIndex].title = title
  if (description !== undefined) tasks[taskIndex].description = description
  if (isDone !== undefined) tasks[taskIndex].isDone = isDone

  res.json({ message: 'Tâche mise à jour', task: tasks[taskIndex] })
})
app.delete('/delete-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === taskId)

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tâche non trouvée' })
  }

  tasks.splice(taskIndex, 1)
  res.json({ message: 'Tâche supprimée' })
})