import PropTypes from 'prop-types'
import { FormControl, Container } from 'react-bootstrap'
import { deleteRecipe } from '../api/recipes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '../contexts/AuthContext'

export function DeleteRecipe({ _id }) {
  //define authentication state
  const [token] = useAuth() //get the token, if its there

  const queryClient = useQueryClient()
  const deleteReceipeMutation = useMutation({
    mutationFn: () => deleteRecipe(token, _id), //call the mutate using State, call the API function

    //invalidate the query in the "recipes"
    //invalidating the Query makes the underlying data "invalid", and causes the component to requery from the database
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })
  //define a function to submit
  const handleDelete = (e) => {
    //prevent full postback, so that push happens in the way we want it to
    e.preventDefault()

    //push to the database
    deleteReceipeMutation.mutate() //mutate
  }

  return (
    <Container>
      {token != null && (
        <form onSubmit={handleDelete}>
          <FormControl
            className='btn btn-link'
            type='submit'
            value={deleteReceipeMutation.isPending ? 'Deleting...' : 'Delete'}
            disabled={deleteReceipeMutation.isPending}
          />
        </form>
      )}
    </Container>
  )
}

DeleteRecipe.propTypes = {
  _id: PropTypes.string,
}
