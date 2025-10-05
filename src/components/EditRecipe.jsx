import PropTypes from 'prop-types'
import { User } from './User'
import { Link } from 'react-router-dom'

import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

/*
 *.jsx allows embedding of HTML with JavaScript, sort of like Blazor
 */
export function EditRecipe({
  title,
  description,
  author: userId,
  //ingredientsListArray,
  ingredientsList,
  imageUrl,
  _id,
}) {
  //console.log(`Got to make thing: ${ingredientsListArray}`)
  return (
    <Card style={{ width: '18rem' }}>
      foo: {imageUrl}
      <Card.Img variant='top' src={imageUrl} />
      <CardBody>
        <CardTitle>
          {title} by <User id={userId} />
        </CardTitle>
        <CardText>
          Reipe Description: {description}
          <br />
          Ingredients:
          <ListGroup>
            {ingredientsList.map((ingredientsList, index) => (
              <ListGroupItem key={index}>{ingredientsList}</ListGroupItem>
            ))}
          </ListGroup>
          <Link to={`/recipe/${_id}`}>Edit</Link>
        </CardText>
      </CardBody>
    </Card>
  )
}

EditRecipe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  author: PropTypes.string,
  //ingredientsListArray: PropTypes.arrayOf(PropTypes.object),
  ingredientsList: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  _id: PropTypes.string,
}
