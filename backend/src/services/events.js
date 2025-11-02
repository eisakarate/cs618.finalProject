import { LikeEvent } from '../db/models/likeEvents.js'

//used to track, i.e, store the event in the database
export async function trackLikeEvent({
  recipeId,
  userId,
  date = Date.now(), //default
}) {
  //add iff the user hasn't liked the recipe
  console.log(`trackLikeEvent: (${recipeId}).(${userId})`)
  const cntMatch = await LikeEvent.countDocuments({
    recipe: recipeId,
    user: userId,
  })
  console.log(`trackLikeEvent Precheck: ${cntMatch}`)

  if (cntMatch < 1) {
    console.log('trackLikeEvent: Liking event')
    const event = new LikeEvent({ recipe: recipeId, user: userId, date })
    return await event.save()
  } else {
    console.log(`trackLikeEvent: can't like event: ${cntMatch}`)
    return LikeEvent({ recipe: recipeId, user: userId, date })
  }
}

export async function getTotalLikes(recipeId) {
  console.log('getTotalLikes')
  return {
    likes: await LikeEvent.countDocuments({ recipe: recipeId }),
  }
}

//get total number of likes by a user, for a recipe
export async function getTotalLikesForRecipeByUser(recipeId, userId) {
  console.log('getTotalLikesForRecipeByUser')
  return {
    likes: await LikeEvent.countDocuments({ recipe: recipeId, user: userId }),
  }
}
