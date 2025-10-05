import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users.js'

import { useAuth } from '../contexts/AuthContext.jsx'

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

export function Login() {
  const [, setToken] = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }), //definte he mutation, call the 'login` method in the `api/users` route
    onSuccess: (data) => {
      setToken(data.token) //set the token in the context
      navigate('/')
    },
    onError: () => alert('failed to login!'),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }
  return (
    <Container fluid>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <NavbarBrand>Welcome to Corgi Recipe :: Welcome Back!</NavbarBrand>
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
              value={loginMutation.isPending ? 'Logging in...' : 'Login '}
              disabled={!username || !password || loginMutation.isPending}
            />
          </form>
        </Col>
      </Row>
    </Container>
  )
}
