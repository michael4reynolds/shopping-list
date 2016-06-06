var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var Storage = function Storage() {
  this.items = []
  this.id = 0
};

Storage.prototype.add = function add(name) {
  var item = {name: name, id: this.id}
  this.items.push(item)
  this.id++
  return item
}

Storage.prototype.remove = function remove(id) {
  this.id--
  return this.items.splice(id, 1)[0]
}

Storage.prototype.update = function update(id, body) {
  body.id = id
  this.items[id] = body
  return this.items[id]
}

var storage = new Storage()
storage.add('Broad beans')
storage.add('Tomatoes')
storage.add('Peppers')

var app = express()
app.use(express.static('public'))

app.get('/items', function (req, res) {
  res.json(storage.items)
})

app.post('/items', jsonParser, function (req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }

  var item = storage.add(req.body.name)
  res.status(201).json(item)
})

app.delete('/items/:id', function (req, res) {
  if (!storage.items[req.params.id]) {
    return res.status(404).json({'item': 'item not found'})
  }
  var item = storage.remove(req.params.id)
  res.status(200).json(item)
})

app.put('/items/:id', jsonParser, function (req, res) {
  if (!storage.items[req.params.id]) {
    return res.status(404).json({'item': 'item not found'})
  }
  if (!req.body) {
    console.log('not found so far')
    return res.sendStatus(400)
  }

  var item = storage.update(req.params.id, req.body)
  res.status(200).json(item)
})

app.listen(process.env.PORT || 8080)
