import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

//Authentication Context - keep track of token
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
})

//a component that then can be used in any area that needs it.  It will wrap any "child" conmponent with the context
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

//define a prototype
AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

//
export function useAuth() {
  const { token, setToken } = useContext(AuthContext)
  return [token, setToken]
}
