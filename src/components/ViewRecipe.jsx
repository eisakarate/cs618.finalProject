import { User } from './User'

import { RecipeStats } from './receipeStats.jsx'

import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'

import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

//create state to hold information on the client-side
//import { useState } from 'react' //author filter, sorting, order

export function ViewRecipe() {
  const queryString = window.location.search
  const queryParams = new URLSearchParams(queryString)

  const __id = queryParams.get('id')
  console.log(`ID: ${__id}`)

  const recipeQueryGet = useQuery({
    queryKey: ['recipes', { __id }],
    queryFn: () => getRecipes({ id: __id }),
  })
  // Handle the different states of the asynchronous request
  if (recipeQueryGet.isLoading) {
    return <div>Loading recipe details...</div>
  }

  if (recipeQueryGet.isError) {
    return <div>Error: {recipeQueryGet.error.message}</div>
  }

  //get data
  const recipesData = recipeQueryGet.data ?? [] //get the result

  console.log(`recipesData: ${JSON.stringify(recipesData)}`)

  const title = recipesData.title
  const imageUrl = recipesData.imageUrl
  const userId = recipesData.author
  const description = recipesData.description
  const listGroupSplit = recipesData.ingredientsList[0].split('\n')
  return (
    <Col sm>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={imageUrl} />
        <CardBody>
          <CardTitle>
            {title} by <User id={userId} />
          </CardTitle>
          <CardText>
            Recipe Description: {description}
            <br />
            Ingredients:
          </CardText>
          <ListGroup>
            {listGroupSplit.map((ingredientsList, index) => (
              <ListGroupItem key={index}>{ingredientsList}</ListGroupItem>
            ))}
          </ListGroup>
          <Row>
            <Col>
              <div>
                <RecipeStats recipeId={recipesData._id}></RecipeStats>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}
