import express from 'express'

const app = express()

app.get('/users', (req, res) => {
    return res.send('Hello NLW Return - Node Server')
})

app.listen(3333, () => {
    console.log("HTTP Server running!")
})