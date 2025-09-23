import { expressjwt } from 'express-jwt'

//configure jwt
export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
})
