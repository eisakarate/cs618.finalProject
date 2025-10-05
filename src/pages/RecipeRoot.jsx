import { RecipeList } from '../components/recipeList.jsx'
import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeFilter } from '../components/recipeFilter.jsx'
import { RecipeSorting } from '../components/recipeSorting.jsx'

import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'

import { Header } from '../components/header.jsx'

//create state to hold information on the client-side
import { useState } from 'react' //author filter, sorting, order

export function RecipeRoot() {
  //add states
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  //define a query
  const recipeQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  //get data
  const recipesData = recipeQuery.data ?? [] //get the result

  //console.log(`Result is: ${JSON.stringify(recipesData)}`)

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      {/* set the value to the current state (author) and set the onChange event to set the author value*/}
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipesData} />
    </div>
  )
}
