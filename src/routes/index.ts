import { Middleware, ParameterizedContext } from 'koa'
import compose from 'koa-compose'

export default function routes(): Middleware<ParameterizedContext> {
  return compose([])
}
