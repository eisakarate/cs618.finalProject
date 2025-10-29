import mongoose, { Schema } from 'mongoose'
const likeEventsSchema = new Schema(
  {
    //recipe that was liked
    recipe: { type: Schema.Types.ObjectId, ref: 'recipe', required: true },

    //user id
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },

    //time stamp of the action
    date: { type: Date, required: true },
  },
  //built in timestamp
  { timestamps: true },
)

export const LikeEvent = mongoose.model('likeEvents', likeEventsSchema)
