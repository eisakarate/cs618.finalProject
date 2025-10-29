import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'

//import jwt
import jwt from 'jsonwebtoken'

export async function createUser({ username, password }) {
  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10) //never store password in clear text
  // instantiate a new user
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

//create login
export async function loginUser({ username, password }) {
  // so cool - the `db.models.users` via `mongoose` connects the database for us!

  //check the login name
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }

  //check the password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }

  //create a token,
  //secret (JWT SECRET, HMAC check) is the environment variable
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })

  //return
  return token
}

//get the user by the user-id
export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    //return the user id if there no match
    if (!user) return { username: userId }
    //return the user name
    return { username: user.username }
  } catch (err) {
    //return the id, mask the error
    return { username: userId }
  }
}

export async function GetUserById(userId) {
  return await User.findById(userId)
}
