import mongoose, { Schema } from 'mongoose'

const ingredientSchema = new Schema({
  name: String,
  amount: Number,
  measurement: String,
})

//define the schema for receipes
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    description: String,
    ingredientsListArray: [ingredientSchema], //for future update
    ingredientsList: [String],
    imageUrl: String,
    likeCount: Number,
  },
  //add timestamps (create timestamp and update timestamp)
  { timestamps: true },
)

//make it public
export const Recipe = mongoose.model('recipe', recipeSchema)
