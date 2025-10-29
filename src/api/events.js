export const recipeTrackEvent = (event) =>
  //push the event to the database
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((res) => res.json())

//add API for getting statistics
export const getTotalLikes = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/totalLikes/${recipeId}`,
  ).then((res) => res.json())
