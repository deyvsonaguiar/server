import { routes } from './routes';
import express from 'express'

const app = express()
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('HTTP Server is running!')
})

