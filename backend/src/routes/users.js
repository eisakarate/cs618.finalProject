import { createUser, loginUser, getUserInfoById } from '../services/users.js'
export function userRoutes(app) {
  //app.post -> POST request
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      //create a user
      const user = await createUser(req.body)

      //return the user
      return res.status(201).json({ username: user.username })
    } catch (err) {
      //catch error
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
      })
    }
  })
  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  //add route to get ther user name
  //  authentication is not added here!
  //    why?  It will be called while user is logging in... I think I may need to update this fopr security later
  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })
}
