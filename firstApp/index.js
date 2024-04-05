require('dotenv').config()
const express = require('express')
const app = express()

const port = 4000  // where we want the server to listen or display

// we are using dotenv file for port url 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send("animesh")
})

app.get("/login", (req, res) =>{
    res.send('<h1>please log in </h1>')
})

app.get("/youtube", (req, res) =>{
    res.send("<h2>animesh kaoty</h2>")
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})

// process.env.PORT is use so that we can use environment variable : google search dotenv
