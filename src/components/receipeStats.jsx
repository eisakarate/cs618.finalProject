import { useQuery, useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'

//add authentication componenets
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

import { Row, Col, Container, InputGroup, Badge } from 'react-bootstrap'
import { getTotalLikes, recipeTrackEvent } from '../api/events'

export function RecipeStats({ recipeId }) {
  const [token] = useAuth() //get the token, if its there
  const [setSession] = useState() //keep track when a user opens a page, this will start a interaction session

  let canLike = false
  let { sub } = ''
  let userId = ''
  if (token) {
    try {
      sub = jwtDecode(token) //get the user-id, then nullify the token, then stay on the page

      console.log(`User Id: ${sub.sub}`)

      canLike = token != null && sub != null
      if (canLike) userId = sub.sub
      //console.log(`Got Sub: ${sub.sub} - canEdit: ${canLike}`)
    } catch (err) {
      console.log(err)
    }
  }

  //define mutation to register LIKE action
  const trackLikeMutation = useMutation({
    mutationFn: () => recipeTrackEvent({ recipeId, userId }),
    onSuccess: (data) => setSession(data?.session),
  })
  //define a function to submit
  const handleLike = (e) => {
    //prevent full postback, so that push happens in the way we want it to
    e.preventDefault()

    //push to the database
    trackLikeMutation.mutate() //mutate
  }

  //run the query to get Total likes
  const totalLikes = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getTotalLikes(recipeId),
  })

  //check if the query is loading
  if (totalLikes.isError) {
    return <div>Error: {totalLikes.error.message}</div>
  }

  if (totalLikes.isLoading) {
    return (
      <div>
        <b>loading stats..</b>
      </div>
    )
  }

  return (
    <Container>
      <form onSubmit={handleLike}>
        <Row>
          <Col>
            <InputGroup>
              <Badge bg='secondary'>{totalLikes.data?.likes} Total likes</Badge>
              {canLike && (
                <button
                  type='submit'
                  value={handleLike.isPending ? '...' : 'Like'}
                  disabled={handleLike.isPending}
                >
                  Like
                </button>
              )}
            </InputGroup>
          </Col>
        </Row>
      </form>
    </Container>
  )
}

RecipeStats.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
