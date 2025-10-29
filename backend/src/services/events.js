import { LikeEvent } from '../db/models/likeEvents.js'

//used to track, i.e, store the event in the database
export async function trackLikeEvent({
  recipeId,
  userId,
  date = Date.now(), //default
}) {
  //add iff ithe user hasn't liked the recipe
  //todo

  const event = new LikeEvent({ recipe: recipeId, user: userId, date })
  return await event.save()
}

export async function getTotalLikes(recipeId) {
  return {
    likes: await LikeEvent.countDocuments({ recipe: recipeId }),
  }
}

//get total number of likes by a user, for a recipe
export async function getTotalLikesForRecipeByUser(recipeId, userId) {
  return {
    likes: await LikeEvent.countDocuments({ recipe: recipeId, user: userId }),
  }
}
