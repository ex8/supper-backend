import { connect } from 'mongoose'

const dbUrl: string = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/supper'

export default async function connectDataBase(): Promise<void> {
  await connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}
