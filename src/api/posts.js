//get postfrom the webAPI
export const getPosts = async (queryParams) => {
  console.log(`$queryParams:` + queryParams)
  console.log(`${import.meta.env.VITE_BACKEND_URL}/posts?`)
  //construct a route
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}
