import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import todoRoutes from "./routes/todos"
import userRoutes from "./routes/auth"
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TS-To-Do-App';


const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })