import mongoose, { Schema } from 'mongoose'

const ingredientSchema = new Schema({
  name: String,
  amount: Number,
  measurement: String,
})

//define the schema
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    description: String,
    ingredientsList: [ingredientSchema],
    imageUrl: String,
  },
  //add timestamps (create timestamp and update timestamp)
  { timestamps: true },
)

//make it public
export const Recipe = mongoose.model('recipe', recipeSchema)
