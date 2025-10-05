import PropTypes from 'prop-types'
import { User } from './User'

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

/*
 *.jsx allows embedding of HTML with JavaScript, sort of like Blazor
 */
export function Recipe({
  title,
  description,
  author: userId,
  ingredientsList,
  imageUrl,
}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={imageUrl} />
      <Card.Body>
        <Card.title>
          {title} by <User id={userId} />
        </Card.title>
        <Card.Text>
          {description}
          <br />
          <ListGroup>
            {ingredientsList.map((ingredientsList, index) => (
              <ListGroupItem key={index}>{ingredientsList}</ListGroupItem>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  author: PropTypes.string,
  ingredientsList: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
}
