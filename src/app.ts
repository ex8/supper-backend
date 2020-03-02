import Koa from 'koa'
import middlewares from './middlewares'
import routes from './routes'

const app: Koa = new Koa()
const port: number = Number(process.env.API_PORT) || 5000

// MongoDB

app.use(middlewares())
// app.use(auth())
app.use(routes())


app.listen(port, () => console.log(`Supper API running on ${port}...`))
