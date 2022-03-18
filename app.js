const express = require("express")

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, express3! 😎'))

app.get('/api/pokemons/1', (req,res)=> res.send('Hello'))

app.listen(port, ()=> console.log(`Notre app node est démarré sur : http://localhost:${port}`))