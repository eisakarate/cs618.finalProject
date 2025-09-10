//app.js - handles routes and definitions of them

import express from 'express'
import { postsRouts } from './routes/posts.js'

import bodyParser from 'body-parser'

import cors from 'cors'

const app = express()

//make the app use the body parser to parse JSON
// bodyParser.Json() -> middleware that intercepts the request and parses it to JSON
app.use(bodyParser.json())

// use the CORS to allow access from other URLs
app.use(cors())
//define routes
postsRouts(app)

//define a route (root)
app.get('/', (req, res) => {
  res.send('hello from express, tests, nodemon running')
})

//define addtional routes
app.get('/posts', (req, res) => {
  res.send('Posts')
})

//make it public
export { app }
