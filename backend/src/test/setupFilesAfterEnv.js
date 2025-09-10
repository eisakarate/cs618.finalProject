import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'

import { initDatabase } from '../db/init.js'

//in
beforeAll(async () => {
  await initDatabase()
})

//disconnect from the database
afterAll(async () => {
  await mongoose.disconnect()
})
