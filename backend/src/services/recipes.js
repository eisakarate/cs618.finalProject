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

//list the top 3 recipes
export async function topThreeRecipes() {
  const recipes = await Recipe.aggregate([
    // Stage 1: Join the Recipes with the Likes collection
    {
      $lookup: {
        from: 'likeevents', // The name of the Likes collection in MongoDB
        localField: '_id', // Field from the Recipes collection
        foreignField: 'recipe', // Field from the Likes collection that references the recipe
        as: 'likes', // Name for the new array field containing matching likes
      },
    },
    // Stage 2: Add a new field "likesCount" to each recipe document
    {
      $addFields: {
        likesCntt: { $size: '$likes' }, // Calculate the size of the 'likes' array
      },
    },
    // Stage 3: Sort the recipes by "likesCount" in descending order (-1)
    {
      $sort: { likesCntt: -1, title: 1 },
    },
    {
      $limit: 3, //top  3 only
    },
    {
      $project: {
        _id: 1,
        title: 1, // Include other recipe fields you need
        author: 1,
        description: 1,
        ingredientsList: 1,
        imageUrl: 1,
        likeCount: 1,
        likesCntt: 1,
      },
    },
  ]).exec()
  console.log('Top Three Stuff')
  console.log(recipes)
  console.log('Top Three Stuff')

  return await recipes
}

//list the recipe
export async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  console.log(`Query: ${query}, Sort: (${sortBy})`)

  switch (sortBy) {
    case 'Like Counts': {
      const sortDirection = sortOrder == 'descending' ? -1 : 1
      console.log(`Query: ${sortOrder}, Sort: (${sortDirection})`)

      const recipes = await Recipe.aggregate([
        // Stage 1: Join the Recipes with the Likes collection
        {
          $lookup: {
            from: 'likeevents', // The name of the Likes collection in MongoDB
            localField: '_id', // Field from the Recipes collection
            foreignField: 'recipe', // Field from the Likes collection that references the recipe
            as: 'likes', // Name for the new array field containing matching likes
          },
        },
        // Stage 2: Add a new field "likesCount" to each recipe document
        {
          $addFields: {
            likesCntt: { $size: '$likes' }, // Calculate the size of the 'likes' array
          },
        },
        // Stage 3: Sort the recipes by "likesCount" in descending order (-1)
        {
          $sort: { likesCntt: sortDirection, title: 1 },
        },
        // Optional Stage 4: Project the final output to exclude the full likes array if desired
        {
          $project: {
            _id: 1,
            title: 1, // Include other recipe fields you need
            author: 1,
            description: 1,
            ingredientsListArray: 1,
            ingredientsList: 1,
            imageUrl: 1,
            likeCount: 1,
            likesCntt: 1,
          },
        },
      ]).exec()

      console.log(recipes)

      return await recipes
    }
    default:
      return await Recipe.find(query).sort({ [sortBy]: sortOrder })
  }
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
  { __id, title, description, ingredientsList, imageUrl },
) {
  console.log(
    `Updating: userId: ${userId}, title: ${title}, recipeId: ${__id}, ingredientsList: ${ingredientsList}`,
  )
  return await Recipe.findOneAndUpdate(
    { _id: __id, author: userId }, //find the recipe by recipeId and UserId
    {
      $set: { title, description, ingredientsList, imageUrl },
    },
    { new: true },
  )
}

//delete a recipe
export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId }) //recipe and userid must match
}
