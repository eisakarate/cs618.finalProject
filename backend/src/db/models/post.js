import mongoose, { Schema } from 'mongoose'

//define the scmea
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  //add timestamps (create timestamp and update timestamp)
  { timestamps: true },
)

//make it public
export const Post = mongoose.model('post', postSchema)
