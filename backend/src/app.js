//app.js - handles routes and definitions of them

import express from 'express'
//fix for Refused to connect  Content Security Policy directive: "connect-src 'self'
//import helmet from 'helmet'

import { recipesRouts } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'

import bodyParser from 'body-parser'

import cors from 'cors'

const app = express()

//make the app use the body parser to parse JSON
// bodyParser.Json() -> middleware that intercepts the request and parses it to JSON
app.use(bodyParser.json())

// use the CORS to allow access from other URLs
app.use(cors())
//define routes
recipesRouts(app)
userRoutes(app)

//define a route (root)
app.get('/', (req, res) => {
  res.send('hello from express, tests, nodemon running')
})

//define addtional routes
app.get('/recipes', (req, res) => {
  res.send('recipes')
})

//make it public
export { app }
