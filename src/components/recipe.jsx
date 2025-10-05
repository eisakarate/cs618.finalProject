import PropTypes from 'prop-types'
import { User } from './User'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'

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
export function Recipe({
  title,
  description,
  author: userId,
  //ingredientsListArray,
  ingredientsList,
  imageUrl,
  _id,
}) {
  const [token] = useAuth() //get the token, if its there
  let { sub } = ''

  let canEdit = false
  if (token) {
    try {
      sub = jwtDecode(token) //get the user-id, then nullify the token, then stay on the page

      canEdit = token != null && sub != null && sub.sub == userId
      console.log(`Got Sub: ${sub.sub} - canEdit: ${canEdit}`)
    } catch (err) {
      console.log(err)
    }
  }

  //console.log(`Got to make thing: ${ingredientsListArray}`)
  return (
    <Card style={{ width: '18rem' }}>
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
          {canEdit && <Link to={`/edit?id=${_id}`}>Edit</Link>}
        </CardText>
      </CardBody>
    </Card>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  author: PropTypes.string,
  //ingredientsListArray: PropTypes.arrayOf(PropTypes.object),
  ingredientsList: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
  _id: PropTypes.string,
}
