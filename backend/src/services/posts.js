import { Post } from '../db/models/post.js'

//Services/post.js performs the CRUD operations
export async function createPost({
  title,
  author,
  contents,
  bibliography,
  tags,
}) {
  const post = new Post({ title, author, contents, bibliography, tags })
  return await post.save()
}

//list the posts
export async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

//list ALL the posts
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

//list posts based on an Author
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

//list posts by Tab
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

//get post by an Id
export async function getPostById(postId) {
  return await Post.findById(postId) //using Mongoose
}

//update a post
export async function updatePost(
  postId,
  { title, author, contents, bibliography, tags },
) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    {
      $set: { title, author, contents, bibliography, tags },
    },
    { new: true },
  )
}

//delete a post
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
