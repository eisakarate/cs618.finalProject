import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

//Services/recipe.js performs the CRUD operations
export async function createRecipe(
  userId,
  {
    title,
    //author, replaced by user-id
    description,
    ingredientsList,
    imageUrl,
  },
) {
  console.log(
    `userId: ${userId}, title: ${title}, description: ${description}, imgeUrl:${imageUrl}`,
  )
  //set the author to the object
  const recipe = new Recipe({
    title,
    author: userId,
    description,
    ingredientsList,
    imageUrl,
  })
  return await recipe.save()
}

//list the recipe
export async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

//list ALL the Recipes
export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

//list Recipes based on an Author
export async function listRecipesByAuthor(authorUserName, options) {
  const user = await User.findOne({ username: authorUserName })

  //find a match?
  if (!user) return []

  return await listRecipes({ author: user._id }, options)
}

//list Recipes by Tab
export async function listRecipeByIngredient(tags, options) {
  return await listRecipes({ tags }, options)
}

//get Recipes by an Id
export async function GetRecipeById(recipeId) {
  console.log(`GetRecipeById: ${recipeId}`)
  return await Recipe.findById(recipeId) //using Mongoose
}

//update a Recipes
export async function updateRecipe(
  userId,
  { __id, title, description, incgredientList, imageUrl },
) {
  console.log(`Updating: userId: ${userId}, title: ${title}, recipeId: ${__id}`)
  return await Recipe.findOneAndUpdate(
    { _id: __id, author: userId }, //find the recipe by recipeId and UserId
    {
      $set: { title, description, incgredientList, imageUrl },
    },
    { new: true },
  )
}

//delete a recipe
export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId }) //recipe and userid must match
}
