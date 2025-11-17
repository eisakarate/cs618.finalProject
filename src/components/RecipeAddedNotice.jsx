import PropTypes from 'prop-types'

import { useRecipe } from '../hooks/useRecipe'

import { Link } from 'react-router-dom' //

export function RecipeAddedNotice() {
  const { recipeIds } = useRecipe()

  console.log(`Settign up RecipeAddedNotice: ${JSON.stringify(recipeIds)}`)

  //get the latest
  const lastRecipe =
    recipeIds.length > 0 ? recipeIds[recipeIds.length - 1] : null

  //generate URI to the recipe
  const generateGoToRecipeURL = (rId) => {
    return `/edit?id=${rId}`
  }

  return (
    <div>
      {lastRecipe ? (
        <div>
          <b>
            Recipe Added: {lastRecipe.recipeId}
            <Link to={generateGoToRecipeURL(lastRecipe.recipeId)}>
              Go to it!
            </Link>
          </b>
        </div>
      ) : (
        //do nothing
        <div />
      )}
    </div>
  )
}

RecipeAddedNotice.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
