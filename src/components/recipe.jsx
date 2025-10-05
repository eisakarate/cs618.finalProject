import PropTypes from 'prop-types'
import { User } from './User'

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
        </CardText>
      </CardBody>
    </Card>
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant='top' src={imageUrl} />
    //   <Card.Body>
    //     <Card.title>
    //       {title} by <User id={userId} />
    //     </Card.title>
    //     <Card.Text>
    //       {description}
    //       <br />
    //       <ListGroup>
    //         {ingredientsList.map((ingredientsList, index) => (
    //           <ListGroupItem key={index}>{ingredientsList}</ListGroupItem>
    //         ))}
    //       </ListGroup>
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  author: PropTypes.string,
  //ingredientsListArray: PropTypes.arrayOf(PropTypes.object),
  ingredientsList: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
}
