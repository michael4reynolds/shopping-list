import express from 'express'
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

class Storage {
  constructor() {
    this.items = []
    this.id = 0
  }

  add(name) {
    const item = {name, id: this.id}
    this.items.push(item)
    this.id++
    return item
  }

  remove(id) {
    this.id--
    return this.items.splice(id, 1)[0]
  }

  update(id, body) {
    body.id = Number(id)
    this.items[id] = body
    return this.items[id]
  }
}

const storage = new Storage()
storage.add('Broad beans')
storage.add('Tomatoes')
storage.add('Peppers')

const app = express()
app.use(express.static('public'))

app.get('/items', (req, res) => {
  res.json(storage.items)
})

app.post('/items', jsonParser, (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(400)
  }

  let item = storage.add(req.body.name)
  res.status(201).json(item)
})

app.delete('/items/:id', (req, res) => {
  if (!storage.items[req.params.id]) {
    return res.status(404).json({'item': 'item not found'})
  }
  
  let item = storage.remove(req.params.id)
  res.status(200).json(item)
})

app.put('/items/:id', jsonParser, (req, res) => {
  if (!storage.items[req.params.id]) {
    return res.status(404).json({'item': 'item not found'})
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.sendStatus(400)
  }

  let item = storage.update(req.params.id, req.body)
  res.status(200).json(item)
})

app.listen(process.env.PORT || 8080)

export {app, storage}
