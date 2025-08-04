import cors from 'cors'
import express from 'express'
import { errorHandlerMiddleware } from './middlewares/errorHandler'

const app = express()

app.use(cors())

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))