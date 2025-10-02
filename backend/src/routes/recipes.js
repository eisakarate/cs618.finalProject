import {
  listAllRecipes,
  listRecipesByAuthor,
  listRecipeByIngredient,
  GetRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'

import { requireAuth } from '../middleware/jwt.js'

//assign routs to the app
export function recipesRouts(app) {
  //get request
  app.get('/api/v1/recipes', async (req, res) => {
    const { sortBy, sortOrder, author, ingredient } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && ingredient) {
        return res.status(400).json({
          error:
            'You tried to query by either author and tag.  You can query via author or tag.',
        })
      } else if (author) {
        return res.json(await listRecipesByAuthor(author, options))
      } else if (ingredient) {
        return res.json(await listRecipeByIngredient(ingredient, options))
      } else {
        return res.json(await listAllRecipes(options))
      }
    } catch (err) {
      console.error('error listing recipes', err)
      return res.status(500).end()
    }
  })
  //get request
  app.get('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params
    try {
      const recipe = await GetRecipeById(id)
      if (recipe === null) return res.status(404).end()
      return res.json(recipe)
    } catch (err) {
      console.error('error getting recipe', err)
      return res.status(500).end()
    }
  })

  //recipe -> wholesale replace, create a recipe
  app.recipe('/api/v1/recipes', requireAuth, async (req, res) => {
    try {
      const recipe = await createRecipe(req.auth.sub, req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('error creating recipe', err)
      return res.status(500).end()
    }
  })

  //update/patch
  app.patch('/api/v1/recipes/:id', requireAuth, async (req, res) => {
    try {
      const recipe = await updateRecipe(req.auth.sub, req.params.id, req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('error updating recipe', err)
      return res.status(500).end()
    }
  })

  //delete
  app.delete('/api/v1/recipes/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deleteRecipe(req.auth.sub, req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting recipe', err)
      return res.status(500).end()
    }
  })
}
