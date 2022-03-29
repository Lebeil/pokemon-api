const express = require("express")
const morgan = require("morgan")
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize  = require('sequelize')

const app = express()
const port = 3000

//middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
    
sequelize.initDb()

app.listen(port, ()=> console.log(`Notre app node est démarré sur : http://localhost:${port}`))