const Sequelize = require('sequelize');
const connection = require('../database/database');

const Tipo = require('./tipo');


const Pokemon = connection.define(
    'pokemon', // nome da tabela
    {
        codigo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipoPokemon: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hp:{
            type: Sequelize.STRING,
            allowNull: false
        },
        atk:{
            type: Sequelize.STRING,
            allowNull: false
        },
        def:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);
//,{foreignKey:'tipoPokemon',as:'nomeTipo', allowNull:false}
Pokemon.belongsTo(Tipo);

//Pokemon.sync({force: true});

module.exports = Pokemon;