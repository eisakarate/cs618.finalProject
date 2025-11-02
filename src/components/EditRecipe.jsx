import { useState } from 'react'
import { updateRecipe } from '../api/recipes.js'
import { RecipeStats } from './receipeStats.jsx'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'

import { useAuth } from '../contexts/AuthContext'

import { jwtDecode } from 'jwt-decode'

import { User } from '../components/User.jsx'

import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from 'react-bootstrap'

//create state to hold information on the client-side
//import { useState } from 'react' //author filter, sorting, order

export function EditRecipe() {
  const queryString = window.location.search
  const queryParams = new URLSearchParams(queryString)

  const __id = queryParams.get('id')
  console.log(`URL: ${window.location.search}`)
  //define authentication state
  const [token] = useAuth() //get the token, if its there

  if (!token) return <div>Please log in to create new recipes.</div>

  const recipeQueryGet = useQuery({
    queryKey: ['recipes', { __id }],
    queryFn: () => getRecipes({ id: __id }),
  })
  console.log(`recipeQueryGet: ${JSON.stringify(recipeQueryGet)}`)

  const queryClient = useQueryClient()
  const editReceipeMutation = useMutation({
    mutationFn: () =>
      updateRecipe(token, {
        __id,
        title,
        description,
        ingredientsList,
        imageUrl,
      }), //call the mutate using State, call the API function

    //invalidate the query in the "recipes"
    //invalidating the Query makes the underlying data "invalid", and causes the component to requery from the database
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })
  //define a function to submit
  const handleSubmit = (e) => {
    //prevent full postback, so that push happens in the way we want it to
    e.preventDefault()

    //push to the database
    editReceipeMutation.mutate() //mutate
  }
  const { sub } = jwtDecode(token) //get the user-id, then nullify the token, then stay on the page

  //get data
  const recipesData = recipeQueryGet.data ?? [] //get the result

  console.log(`Result for edit is: ${JSON.stringify(recipesData)}`)

  const [title, setTitle] = useState(recipesData.title) //setTitle is an "alias" to "function" that set the state value for title
  const [description, setDescription] = useState(
    typeof recipesData.description === 'undefined'
      ? ''
      : recipesData.description,
  )
  const [ingredientsList, setIngredientsList] = useState(
    typeof recipesData.ingredientsList === 'undefined'
      ? ''
      : recipesData.ingredientsList,
  ) //initiialize to empty-string
  const [imageUrl, setImageUrl] = useState(
    typeof recipesData.imageUrl === 'undefined' ? '' : recipesData.imageUrl,
  ) //initiialize to empty-string

  if (token)
    return (
      <div style={{ padding: 8 }}>
        Edit Recipe:
        <br />
        <Container fluid>
          <Row className='justify-content-md-center mt-5'>
            <Col xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                {/* {e}=>e.preventDefault(), makes it so that page doesn't refresh on click on the submission control */}
                <FormGroup>
                  <FormLabel htmlFor='create-title'>Title: </FormLabel>
                  {/* add a field for entering a title */}
                  <FormControl
                    type='text'
                    name='create-title'
                    id='create-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
                <br />
                <FormGroup>
                  <FormLabel htmlFor='create-author'>Author: </FormLabel>{' '}
                  <User id={sub} />
                </FormGroup>
                <br />
                <FormGroup>
                  <FormLabel htmlFor='create-bibliography'>
                    Description:{' '}
                  </FormLabel>
                  {/* add a field for entering an author */}
                  <FormControl
                    type='text'
                    name='create-description'
                    id='create-description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormGroup>
                <br />
                <FormGroup>
                  <FormLabel htmlFor='ingredient_list'>
                    Ingredients List:{' '}
                  </FormLabel>
                  {/* add a field for entering a content? */}
                  <FormControl
                    as='textarea'
                    name='ingredient_list'
                    id='ingredient_list'
                    value={ingredientsList}
                    onChange={(e) => setIngredientsList(e.target.value)}
                  />
                </FormGroup>
                <br />
                <FormGroup>
                  <FormLabel htmlFor='blog-content'>Image URL: </FormLabel>
                  {/* add a field for entering a content? */}
                  <FormControl
                    type='text'
                    name='create-imageURL'
                    id='create-imageURL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </FormGroup>
                <br />
                {/* disable when there is no title */}
                {/* Display correct button text correctly */}
                <FormControl
                  type='submit'
                  value={
                    editReceipeMutation.isPending ? 'Updating...' : 'Update'
                  }
                  disabled={!title || editReceipeMutation.isPending}
                />
                {/* display a status message */}
                {editReceipeMutation.isSuccess ? (
                  <>
                    <br />
                    Receipt has been updated successfully!
                  </>
                ) : null}
              </form>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <RecipeStats recipeId={__id}></RecipeStats>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
}
