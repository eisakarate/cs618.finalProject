import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  //updatePost,
  //deletePost,
} from '../services/posts.js'
import { Post } from '../db/models/post.js'

const samplePosts = [
  { title: 'corgi eating', author: 'Eevee', tags: ['first'] },
  { title: 'corgi dancing', author: 'Eevee', tags: ['dance'] },
  { title: 'corgi eating more', author: 'Ein', tags: ['food'] },
  { title: 'TitleOnly' },
  { title: 'BibioLtest', bibilography: ['book 1', 'book 2'] },
]

let createdSamplePosts = []
beforeEach(async () => {
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

//get test

describe('post retrieval tests', () => {
  test('should return all the items in the post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should fail if the id does not exist in the database', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

//add tests to get posts
describe('listing post tests', () => {
  test('should return all posts in the database', async () => {
    const posts = await listAllPosts()
    console.log(posts.length)
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag('first')
    expect(posts.length).toBe(1)
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Eevee')
    expect(posts.length).toBe(2)
  })
})

//Test create
describe('Testing creating posts', () => {
  //unit test: test to see if the adding was successful
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Hello Corgi!',
      author: 'Eevee Potato',
      contents: 'Corgis are Potatos with feet.',
      bibliography: [
        "You don't need it. You just need me. Every day",
        'You jut need me.corgi',
        'Feed the potato, Ed. Always',
      ],
      tags: ['Awesome', 'Corgi'],
    }
    //create a post
    const createdPost = await createPost(post)
    //check to see if the Id is of the correct type
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    //search by the id
    const foundPost = await Post.findById(createdPost._id)
    console.log(`${createdPost._id}: ${createdPost.bibliography}`)
    console.log(`${foundPost._id}: ${foundPost.bibliography}`)
    //check to to see if the found item has the same id
    expect(foundPost).toEqual(expect.objectContaining(post))
    //check to make sure that time stamps are dates
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })
})
