import { Middleware, ParameterizedContext } from 'koa'
import compose from 'koa-compose'
import logger from 'koa-logger'
import cors from 'koa-cors'
import bodyParser from 'koa-body'

export default function middleware(): Middleware<ParameterizedContext> {
  return compose([
    logger(),
    cors(),
    bodyParser(),
  ]) 
}
