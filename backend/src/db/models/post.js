import mongoose, { Schema } from 'mongoose'

//define the schema
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    bibliography: [String],
    tags: [String],
  },
  //add timestamps (create timestamp and update timestamp)
  { timestamps: true },
)

//make it public
export const Post = mongoose.model('post', postSchema)
