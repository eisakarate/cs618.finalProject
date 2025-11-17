import PropTypes from 'prop-types'

import { useRecipe } from '../hooks/useRecipe'
import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom' //

import { Modal, ModalBody, Button } from 'react-bootstrap'

export function RecipeAddedNotice() {
  const { recipeIds } = useRecipe()

  console.log(`Settign up RecipeAddedNotice: ${JSON.stringify(recipeIds)}`)

  //get the latest
  const lastRecipe =
    recipeIds.length > 0 ? recipeIds[recipeIds.length - 1] : null

  //generate URI to the recipe
  const generateGoToRecipeURL = (rId) => {
    return `/view?id=${rId}`
  }
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  useEffect(() => {
    if (lastRecipe) {
      setShow(true) // Automatically show the modal when a new recipe is available
    }
  }, [lastRecipe]) // This effect runs every time lastRecipe changes
  return (
    <div>
      {lastRecipe ? (
        <div
          className='modal show'
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>New Recipe Added!</Modal.Title>
            </Modal.Header>
            <ModalBody>
              Recipe Added: {lastRecipe.recipeId.title} <br />
              <Link to={generateGoToRecipeURL(lastRecipe.recipeId.id)}>
                Click Go see it!
              </Link>
            </ModalBody>
            <Modal.Footer>
              <Button variant='primary' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
