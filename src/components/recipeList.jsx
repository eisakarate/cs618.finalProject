import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Recipe } from './recipe.jsx'

//Fragment -> group it, sort of like a DIV?
//.map -> creates a new array by applyig a provided function to each element of an existing array
// ... -> spread operator
//      applies members of the 'post' to corresponding memers of Post prototype

export function RecipeList({ recipes = [] }) {
  return (
    <div>
      {recipes.map((recipe) => (
        <Fragment key={recipe._id}>
          <Recipe {...recipe} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
}
