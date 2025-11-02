import { trackLikeEvent, getTotalLikes } from '../services/events.js'
import { GetRecipeById } from '../services/recipes.js'
import { GetUserById } from '../services/users.js'

export function eventRoutes(app) {
  //add "like" addition event
  app.post('/api/v1/events', async (req, res) => {
    try {
      const { recipeId, userId } = req.body

      console.log(`Event Reg: ${recipeId}, user: ${userId}`)

      const post = await GetRecipeById(recipeId)
      const user = await GetUserById(userId)

      if (post === null) return res.status(400).end()
      if (user === null) return res.status(400).end()

      console.log(`Go trackLikeEvent`)
      const event = await trackLikeEvent({ recipeId, userId })

      return res.json({ recipeId: event.recipe._id })
    } catch (err) {
      console.error('error tracking action', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/events/totalLikes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await GetRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      {
        console.log(`totalLikes: counting likes for: ${recipeId}`)
      }
      const stats = await getTotalLikes(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting stats', err)
      return res.status(500).end()
    }
  })
}
