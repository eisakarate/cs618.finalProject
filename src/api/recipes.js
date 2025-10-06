//get Recipes from the webAPI
export const getRecipes = async (queryParams) => {
  console.log(`getRecipes: queryParams:${JSON.stringify(queryParams)}`)
  console.log(
    `getRecipes: Sending request to: ${
      import.meta.env.VITE_BACKEND_URL
    }/recipes?`,
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

//add a second funcion
export const updateRecipe = async (token, recipe) => {
  console.log(`Recipe to update: ${JSON.stringify(recipe)}`)
  //create a Recipe request, and push the Recipe information the endpoint
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`, //set the token into the header
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}

export const deleteRecipe = async (token, recipeId) => {
  console.log(`Recipe to delete: ${recipeId}`)
  //create a Recipe request, and push the Recipe information the endpoint
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`, //set the token into the header
      },
    },
  )
  return await res.json()
}
