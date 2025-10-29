import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'

import { getTotalLikes } from '../api/events'

export function RecipeStats({ recipeId }) {
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
    <div>
      <b>{totalLikes.data?.likes} total likes</b>
    </div>
  )
}

RecipeStats.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
