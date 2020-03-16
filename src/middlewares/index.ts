import { Middleware } from 'koa'
import compose from 'koa-compose'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-body'

export default function middleware(): Middleware {
  return compose([
    logger(),
    helmet(),
    cors(),
    bodyParser(),
  ]) 
}
