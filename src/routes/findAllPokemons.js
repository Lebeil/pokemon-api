const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if(req.query.name){
            const name = req.query.name
            return Pokemon.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%` // 'name est le critère de la recherche
                    }
                },
                order: ['name'],
                limit: 5 
            })
            .then(pokemons => {
                const message = `Il y a ${pokemons.length} pokémons qui correspondent au terme de recherche ${name}.`
                res.json({message, data: pokemons})
            })
        } else {
            Pokemon.findAll()
            .then(pokemons => {
            const message = 'La liste des pokémons a bien été récupérée.'
            res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = `La liste des pokémons n'a pas pu être récupérer.`
                res.status(500).json({ message, data: error })
            })
        }   
    })
}