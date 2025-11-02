import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'

//add authentication componenets
import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

import { Row, Col, Container, InputGroup, Badge } from 'react-bootstrap'
import { getTotalLikes, recipeTrackEvent } from '../api/events'

export function RecipeStats({ recipeId }) {
  const queryClient = useQueryClient()
  const [token] = useAuth() //get the token, if its there
  const [setSession] = useState() //keep track when a user opens a page, this will start a interaction session

  let canLike = false
  let { sub } = ''
  let userId = ''
  if (token) {
    try {
      sub = jwtDecode(token) //get the user-id, then nullify the token, then stay on the page

      canLike = token != null && sub != null
      if (canLike) userId = sub.sub
      //console.log(`Got Sub: ${sub.sub} - canEdit: ${canLike}`)
    } catch (err) {
      console.log(err)
    }
  }
  //run the query to get Total likes
  const {
    data: totalLikesCount,
    totalLikesIsLoading,
    totalLikesIsError,
  } = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => {
      console.log('calling count query')
      return getTotalLikes(recipeId)
    },
  })

  //define mutation to register LIKE action
  const trackLikeMutation = useMutation({
    mutationFn: () => {
      console.log('Updates the count')
      recipeTrackEvent({ recipeId, userId })
    },
    onSettled: async (data) => {
      // <-- Make onSettled async
      console.log(`refresh the count for: ${recipeId}. Awaiting refetch...`)
      // AWAIT the invalidation/refetch to complete
      await queryClient.invalidateQueries({
        queryKey: ['totalLikes', recipeId],
      })
      //['top3Recipes', 'foofoo'],
      await queryClient.invalidateQueries({
        queryKey: ['top3Recipes', 'foofoo'],
      })
      setSession(data?.session) // This might need adjustment based on what 'data' is
      console.log('Refetch complete, UI should update now.')
    },
  })
  //define a function to submit
  const handleLike = (e) => {
    //prevent full postback, so that push happens in the way we want it to
    e.preventDefault()

    //push to the database
    trackLikeMutation.mutate() //mutate
  }
  //check if the query is loading
  if (totalLikesIsError) {
    return <div>Error: getting like counts</div>
  }

  if (totalLikesIsLoading) {
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
              <Badge bg='secondary'>{totalLikesCount?.likes} Total likes</Badge>
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
