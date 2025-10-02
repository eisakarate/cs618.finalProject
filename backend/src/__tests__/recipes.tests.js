import mongoose from 'mongoose'
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals'
import {
  listAllRecipes,
  listRecipesByAuthor,
  //listRecipeByIngredient,
  GetRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'
import { Recipe } from '../db/models/recipe.js'

import { createUser } from '../services/users.js'

//create a user before everthing
let testUser = null
let sampleRecipes = []

beforeAll(async () => {
  testUser = await createUser({ username: 'Eevee', password: 'poTatoCheese' })

  //create sample recipe
  sampleRecipes = [
    {
      title: 'corgi dancing',
      author: testUser._id,
      description: 'Testing',
      imageUrl: 'https://www.akc.org/dog-breeds/pembroke-welsh-corgi/',
      ingredientList: [{ name: 'food', amount: '1', measurement: 'bag' }],
    },
  ]
})

//create tests
describe('creating recipe', () => {
  test('with all parameters should succeed', async () => {
    const recipe = {
      title: 'Hello Mongoose Cats!',
      description: 'Foo',
      imageUrl: 'https://www.akc.org/dog-breeds/pembroke-welsh-corgi/',
      ingredientList: [{ name: 'food', amount: '1', measurement: 'bag' }],
    }
    // passing the testUser_id
    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
    console.log(`Created Test`)
    console.log(`Created :${createdRecipe._id}`)
    const foundRecipe = await Recipe.findById(createdRecipe._id)
    console.log(`foundRecipe: ${foundRecipe._id}`)
    //expect(foundRecipe).toEqual(expect.objectContaining(recipe))
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
    // we need to explicitly convert the id to a string, because it is an ObjectId object
    expect(String(foundRecipe.author?._id)).toMatch(String(testUser?._id))
  })

  test('without title should fail', async () => {
    const recipe = {
      description: 'Foo',
      imageUrl: 'https://www.akc.org/dog-breeds/pembroke-welsh-corgi/',
    }
    try {
      await createRecipe(testUser._id, recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('with minimal parameters should succeed', async () => {
    const recipe = {
      title: 'Only a title',
    }
    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

let createdsampleRecipes = []

beforeEach(async () => {
  await Recipe.deleteMany({})
  createdsampleRecipes = []
  for (const recipe of sampleRecipes) {
    const createdRecipe = new Recipe(recipe)
    createdsampleRecipes.push(await createdRecipe.save())
  }
})

//get test
describe('recipe retrieval tests', () => {
  test('should return all the items in the recipe', async () => {
    const recipe = await GetRecipeById(createdsampleRecipes[0]._id)
    expect(recipe.toObject()).toEqual(createdsampleRecipes[0].toObject())
  })

  test('should fail if the id does not exist in the database', async () => {
    const recipe = await GetRecipeById('000000000000000000000000')
    expect(recipe).toEqual(null)
  })
})

//add tests to get recipes
describe('listing recipe tests', () => {
  test('should return all recipe in the database', async () => {
    const recipes = await listAllRecipes()
    console.log(recipes.length)
    expect(recipes.length).toEqual(createdsampleRecipes.length)
  })

  // test('should be able to filter recipes by ingredient', async () => {
  //   const recipes = await list('react')
  //   expect(recipes.length).toBe(2)
  // })

  test('should be able to filter recipes by author', async () => {
    const recipes = await listRecipesByAuthor(testUser.username)
    expect(recipes.length).toBe(1)
  })
})

describe('updating recipe', () => {
  test('should update the specified property', async () => {
    await updateRecipe(testUser._id, createdsampleRecipes[0]._id, {
      description: 'Test Update foo',
    })
    const updatedRecipe = await Recipe.findById(createdsampleRecipes[0]._id)
    expect(updatedRecipe.description).toEqual('Test Update foo')
  })

  test('should not update other properties', async () => {
    await updateRecipe(testUser._id, createdsampleRecipes[0]._id, {
      description: 'Test Update foo',
    })
    const updatedRecipe = await Recipe.findById(createdsampleRecipes[0]._id)
    expect(updatedRecipe.title).toEqual('corgi dancing')
  })

  test('should update the updatedAt timestamp', async () => {
    await updateRecipe(testUser._id, createdsampleRecipes[0]._id, {
      description: 'Test Update',
    })
    const updatedRecipe = await Recipe.findById(createdsampleRecipes[0]._id)
    expect(updatedRecipe.updatedAt.getTime()).toBeGreaterThan(
      createdsampleRecipes[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exist', async () => {
    const recipe = await updateRecipe(
      testUser._id,
      '000000000000000000000000',
      {
        contents: 'Test Update',
      },
    )
    expect(recipe).toEqual(null)
  })
})

describe('deleting recipes', () => {
  test('should remove the recipes from the database', async () => {
    const result = await deleteRecipe(testUser._id, createdsampleRecipes[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedRecipe = await Recipe.findById(createdsampleRecipes[0]._id)
    expect(deletedRecipe).toEqual(null)
  })

  test('should fail if the id does not exist', async () => {
    const result = await deleteRecipe(testUser._id, '000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
