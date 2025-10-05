import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { User } from './User.jsx'

import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from 'react-bootstrap'

// how to call the Post API?
//use a mutation (useMutation)

export function CreateRecipe() {
  //define authentication state
  const [token] = useAuth() //get the token, if its there

  //define states
  const [title, setTitle] = useState('') //setTitle is an "alias" to "function" that set the state value for title
  const [description, setDescription] = useState('')
  const [ingredientsList, setIngredientsList] = useState('') //initiialize to empty-string
  const [imageUrl, setImageUrl] = useState('') //initiialize to empty-string

  const queryClient = useQueryClient()
  const createReceipeMutation = useMutation({
    mutationFn: () =>
      createRecipe(token, { title, description, ingredientsList, imageUrl }), //call the mutate using State, call the API function

    //invalidate the query in the "recipes"
    //invalidating the Query makes the underlying data "invalid", and causes the component to requery from the database
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  //define a function to submit
  const handleSubmit = (e) => {
    //prevent full postback, so that push happens in the way we want it to
    e.preventDefault()

    //push to the database
    createReceipeMutation.mutate() //mutate
  }

  //check for authentication
  if (!token) return <div>Please log in to create new recipes.</div>

  const { sub } = jwtDecode(token) //get the user-id, then nullify the token, then stay on the page
  //prevent
  return (
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
              <FormLabel htmlFor='create-bibliography'>Description: </FormLabel>
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
              <FormLabel htmlFor='blog-content'>Ingredients List: </FormLabel>
              {/* add a field for entering a content? */}
              <textarea
                name='blog-content'
                id='blog-content'
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
              value={createReceipeMutation.isPending ? 'Creating...' : 'Create'}
              disabled={!title || createReceipeMutation.isPending}
            />
            {/* display a status message */}
            {createReceipeMutation.isSuccess ? (
              <>
                <br />
                Receipt has been registered successfully!
              </>
            ) : null}
          </form>
        </Col>
      </Row>
    </Container>
  )
}
