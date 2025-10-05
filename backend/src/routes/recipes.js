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
    const { sortBy, sortOrder, author, ingredient, id } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && ingredient) {
        return res.status(400).json({
          error:
            'You tried to query by either author and tag.  You can query via author or tag.',
        })
      } else if (author) {
        console.log(`listRecipesByAuthor`)
        return res.json(await listRecipesByAuthor(author, options))
      } else if (ingredient) {
        console.log(`listRecipeByIngredient`)
        return res.json(await listRecipeByIngredient(ingredient, options))
      } else if (id) {
        console.log(
          `GetRecipeById: passed ${id} from ${JSON.stringify(req.query)}}`,
        )
        return res.json(await GetRecipeById(id))
      } else {
        return res.json(await listAllRecipes(options))
      }
    } catch (err) {
      console.error('error listing recipes', err)
      return res.status(500).end()
    }
  })
  // //get request
  // app.get('/api/v1/recipesEdit/:id', async (req, res) => {
  //   const { id } = req.params
  //   try {
  //     console.log(`get request: ${id}`)

  //     const recipe = await GetRecipeById(id)
  //     if (recipe === null) return res.status(404).end()
  //     return res.json(recipe)
  //   } catch (err) {
  //     console.error('error getting recipe', err)
  //     return res.status(500).end()
  //   }
  // })

  //post -> wholesale replace, create a recipe
  app.post('/api/v1/recipes', requireAuth, async (req, res) => {
    try {
      console.log(`Create: ${JSON.stringify(req.body)}`)
      const recipe = await createRecipe(req.auth.sub, req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('error creating recipe', err)
      return res.status(500).end()
    }
  })

  //update/patch
  app.patch('/api/v1/recipes/', requireAuth, async (req, res) => {
    console.log('Patching, ie., Update')
    try {
      const recipe = await updateRecipe(req.auth.sub, req.body)
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
