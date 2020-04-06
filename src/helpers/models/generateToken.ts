import { sign } from 'jsonwebtoken'
import { secret } from '../../middlewares/passport'

export function generateToken(payload: Record<string, string>, options?: Record<string, string>) {
  return sign(payload, secret, { ...options, expiresIn: '5h' })
}
