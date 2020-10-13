const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let db

let auto = [
  {
    name: 'BMW',
    foundation: 1916
  },
  {
    name: 'AUDI',
    foundation: 1909
  },
  {
    name: 'FIAT',
    foundation: 1899
  }
];

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/auto', (req, res) => {
  res.send(auto)
})
app.get('/auto/:name', (req, res) => {
  // console.log(req.params)
  const getModel = auto.find((model) => {
    return model.name === req.params.name
  })
  res.send(getModel ? "true" : "false")
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('post request is ')
})
app.post('/auto', (req, res) => {
  const model = {
    name: req.body.name,
    foundation: req.body.foundation
  }
  auto.push(model)
  res.send(auto)
})

app.put('/auto/:name', (req, res) => {
  const getIndex = auto.findIndex((model) => {
    return model.name === req.params.name.toUpperCase()
  })
  auto[getIndex].foundation = req.body.foundation
  res.sendStatus(200)
})

app.delete('/auto/:name', (req, res) => {
  auto = auto.filter((model) => {
    return model.name !== req.params.name.toUpperCase()
  })
  res.sendStatus(200)
  // res.send(auto)
})



MongoClient.connect('mongodb://localhost:27017/myapi', { useUnifiedTopology: true }, (err, database) => {
  if (err) console.log(err)
  db = database
  app.listen(7000, () => {
    console.log('Server has started on 7000 port')
  })
})