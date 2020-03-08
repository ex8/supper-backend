import { connect } from 'mongoose'

const dbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/supper'

export default async function connectDataBase() {
  await connect(dbUrl, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}
