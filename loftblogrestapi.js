const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var db

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
  db.collection('auto').find().toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.send(docs)
  })
})
app.get('/auto/:name', (req, res) => {
  // console.log(req.params)
  // const getModel = auto.find((model) => {
  //   return model.name === req.params.name
  // })
  // res.send(getModel ? "true" : "false")
  db.collection('auto').findOne({ _id: ObjectID(req.params.name) }, (err, doc) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.send(doc)
  })
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
  db.collection('auto').insertOne(model, (err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.send(model)
  })
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



MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) console.log(err)
  db = client.db('myapi')
  app.listen(7000, () => {
    console.log('Server has started on 7000 port')
  })
})