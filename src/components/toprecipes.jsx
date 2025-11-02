import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { RecipeWithLikeCount } from './recipeWithLikeCount'
import { Container, Navbar, Row } from 'react-bootstrap'

//Fragment -> group it, sort of like a DIV?
//.map -> creates a new array by applyig a provided function to each element of an existing array
// ... -> spread operator
//      applies members of the 'post' to corresponding memers of Post prototype

export function TopRecipes({ tops = [] }) {
  console.log('tops---------------')
  console.log(JSON.stringify(tops))
  console.log('tops---------------')
  if (!Array.isArray(tops)) {
    console.error(
      "TopRecipes expected an array for 'tops' prop, but received:",
      tops,
    )
    return null // Or render an error message/fallback UI
  }
  return (
    <Container>
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand>Top 3 Recipes!</Navbar.Brand>
        </Container>
      </Navbar>
      <Row>
        {tops.map((recipe) => (
          <Fragment key={recipe._id}>
            <RecipeWithLikeCount {...recipe} />
          </Fragment>
        ))}
      </Row>
    </Container>
  )
}

TopRecipes.propTypes = {
  tops: PropTypes.arrayOf(PropTypes.shape(RecipeWithLikeCount.propTypes))
    .isRequired,
}
