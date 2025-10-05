import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/users.js'

//bootstrap
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Navbar,
  NavbarBrand,
} from 'react-bootstrap'

export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }), //definte he mutation, call the 'sign up` method in the `api/users` route
    onSuccess: () => navigate('/login'), //on success, go to the /login route
    onError: () => alert('failed to sign up!'),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }
  return (
    <Container fluid>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <NavbarBrand>
            Welcome to Corgi Recipe :: Register to be become a Corgi Friend
          </NavbarBrand>
          <Form inline>
            <Row>
              <Col xs='auto'></Col>
              <Col xs='auto'>
                <Link to='/'>Back to main page</Link>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor='create-username'>Username: </FormLabel>
              <FormControl
                type='text'
                name='create-username'
                id='create-username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <FormLabel htmlFor='create-password'>Password: </FormLabel>
              <FormControl
                type='password'
                name='create-password'
                id='create-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <br />
            <FormControl
              type='submit'
              value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
              disabled={!username || !password || signupMutation.isPending}
            />
          </form>
        </Col>
      </Row>
    </Container>
  )
}
