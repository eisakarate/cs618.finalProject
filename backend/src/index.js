//setting the variables of the application and running the server

//set up to read from ENVIRONEMT variables
import dotenv from 'dotenv'

//import database initialization
import { initDatabase } from './db/init.js'

//1. require dotenv to be installed
//2. run the config to put all the values from (*.env) into the environment variables
//3. load them into 'process.env' environment varilables
dotenv.config() //initialize the environment variables

//setup the app
import { app } from './app.js'

const PORT = process.env.PORT //this should be in the environment

//initialize the database
await initDatabase()

//start the server
app.listen(PORT)

console.info(`express server running on https://localhost:${PORT}`)
