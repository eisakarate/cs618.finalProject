import { RecipeList } from '../components/recipeList.jsx'
import { RecipeFilter } from '../components/recipeFilter.jsx'
import { RecipeSorting } from '../components/recipeSorting.jsx'

import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'

import { Header } from '../components/header.jsx'

//create state to hold information on the client-side
import { useState } from 'react' //author filter, sorting, order
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function RecipeRoot() {
  const [token] = useAuth() //get the token, if its there

  //add states
  const [author, setAuthor] = useState('')
  //const [title, setTitle] = useState('')
  const title = ''
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  //define a query
  const recipeQuery = useQuery({
    queryKey: ['recipes', { author, title, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, title, sortBy, sortOrder }),
  })

  //get data
  const recipesData = recipeQuery.data ?? [] //get the result

  //console.log(`Result is: ${JSON.stringify(recipesData)}`)

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <hr />
      <Container>
        {/* set the value to the current state (author) and set the onChange event to set the author value*/}
        {/* <RecipeFilter
          field='Title'
          value={title}
          onChange={(value) => setTitle(value)}
        /> */}
        <Row>
          <RecipeFilter
            field='Author'
            value={author}
            onChange={(value) => setAuthor(value)}
          />
          <RecipeSorting
            fields={['createdAt', 'updatedAt']}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            orderValue={sortOrder}
            onOrderChange={(orderValue) => setSortOrder(orderValue)}
          />
          <Col>{token != null && <Link to='/add'>Add a New Recipe</Link>}</Col>
        </Row>
      </Container>
      <hr />
      <RecipeList recipes={recipesData} />
    </div>
  )
}
