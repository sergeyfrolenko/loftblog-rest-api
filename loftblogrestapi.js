const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const auto = [
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

app.listen(7000, () => {
  console.log('Server has started on 7000 port')
})