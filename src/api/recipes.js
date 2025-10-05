//get Recipefrom the webAPI
export const getRecipes = async (queryParams) => {
  console.log(`queryParams:${JSON.stringify(queryParams)}`)
  console.log(
    `Sending request to: ${import.meta.env.VITE_BACKEND_URL}/recipes?`,
  )
  //construct a route
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

//add a second funcion
export const createRecipe = async (token, recipe) => {
  console.log(`Recipe: ${JSON.stringify(recipe)}`)
  //create a Recipe request, and push the Recipe information the endpoint
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`, //set the token into the header
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}
