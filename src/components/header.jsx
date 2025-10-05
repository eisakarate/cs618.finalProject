import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'
import { User } from './User.jsx'

import {
  Navbar,
  Container,
  NavbarBrand,
  Form,
  Row,
  Col,
  FormText,
} from 'react-bootstrap'

//setup a header link
export function Header() {
  const [token, setToken] = useAuth() //get the token, if its there

  //set the title so that it no longer reads vite+react
  document.title = 'Corgi Blog Time!'

  //if there is a token, then display the logout, then clearout the token
  if (token) {
    const { sub } = jwtDecode(token) //get the user-id, then nullify the token, then stay on the page
    return (
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <NavbarBrand>Welcome to Corgi Recipe</NavbarBrand>
          <Form inline>
            <Row>
              <Col xs='auto'>
                <FormText>
                  Logged in as <User id={sub} />
                </FormText>
              </Col>
              <Col xs='auto'>
                <button onClick={() => setToken(null)}>Logout</button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    )
  }

  //display the default when there is no token
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <NavbarBrand>Welcome to Corgi Recipe</NavbarBrand>
        <Form inline>
          <Row>
            <Col xs='auto'>
              <Link to='/login'>Log In</Link>
            </Col>
            <Col xs='auto'>
              <Link to='/signup'>Sign Up</Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  )
}
