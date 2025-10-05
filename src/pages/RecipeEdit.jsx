// import { RecipeList } from '../components/recipeList.jsx'
// import { CreateRecipe } from '../components/CreateRecipe.jsx'
// import { RecipeFilter } from '../components/recipeFilter.jsx'
// import { RecipeSorting } from '../components/recipeSorting.jsx'

import { useQuery } from '@tanstack/react-query'
import { getRecipe } from '../api/recipes.js'

import { Header } from '../components/header.jsx'
import { useAuth } from '../contexts/AuthContext'

import { useParams } from 'react-router'

//create state to hold information on the client-side
//import { useState } from 'react' //author filter, sorting, order

export function RecipeEdit() {
  //define authentication state
  const [token] = useAuth() //get the token, if its there
  const { __id } = useParams()
  //define a query
  //   const recipeQuery = useQuery({
  //     queryKey: ['recipes', { author, sortBy, sortOrder }],
  //     queryFn: () => getRecipe({ author, sortBy, sortOrder }),
  //   })
  const recipeQuery = useQuery({
    queryKey: ['recipes', { __id }],
    queryFn: () => getRecipe(token, { __id }),
  })

  //get data
  const recipesData = recipeQuery.data ?? [] //get the result

  console.log(`Result is: ${JSON.stringify(recipesData)}`)

  return (
    <div style={{ padding: 8 }}>
      <Header />
      Edit Recipe: {__id}
      <br />
    </div>
  )
}
