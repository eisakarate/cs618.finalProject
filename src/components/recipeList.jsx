import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Recipe } from './recipe.jsx'
import { Container, Row, Navbar } from 'react-bootstrap'

//Fragment -> group it, sort of like a DIV?
//.map -> creates a new array by applyig a provided function to each element of an existing array
// ... -> spread operator
//      applies members of the 'post' to corresponding memers of Post prototype

export function RecipeList({ recipes = [] }) {
  console.log(JSON.stringify(recipes))
  return (
    <Container>
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand>All the Recipes!</Navbar.Brand>
        </Container>
      </Navbar>
      <Row>
        {recipes.map((recipe) => (
          <Fragment key={recipe._id}>
            <Recipe {...recipe} />
          </Fragment>
        ))}
      </Row>
    </Container>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
}
