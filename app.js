const express = require("express")
const morgan = require("morgan")
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { success, getUniqueId } = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

//middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
// const logger = (req, res, next) => {
//     console.log(`URL: ${req.url}`);
//     next()
// }

//middleware
app.use((req, res, next)=> {
    console.log(`URL : ${req.url}`);
    next()
})

app.get('/', (req, res) => res.send('Hello, express3! 😎'))

app.get('/api/pokemons/:id', (req,res)=> {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokemon a bien été trouvé'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res)=> {
    const message = 'Voici la liste des pokemons'
    res.json(success(message,pokemons))
})

app.post('/api/pokemons', (req, res)=> {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.listen(port, ()=> console.log(`Notre app node est démarré sur : http://localhost:${port}`))