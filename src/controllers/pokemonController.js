const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilidades = require('../utils/utils');

const Pokemon = require('../models/pokemon');
const Tipo = require('../models/tipo');

exports.create = (req, res, next) => {
    const codigo = req.body.codigo;
    const nome = req.body.nome;
    const tipoPokemon = req.body.tipoPokemon;
    const hp = req.body.hp;
    const atk = req.body.atk;
    const def = req.body.def;

    if (codigo === undefined ||
        nome === undefined ||
        tipoPokemon === undefined ||
        hp === undefined ||
        atk === undefined ||
        def === undefined) {
        res.status(400).json({
            mensagem: 'Por favor preencha todos os campos'
        });
    }
    else {
        Pokemon.findOne({
            where: {
                codigo: codigo
            }
        }).then(pokemon => {
            if (pokemon == undefined) {
                Pokemon.create({
                    codigo: codigo,
                    nome: nome,
                    tipoPokemon: tipoPokemon,
                    hp: hp,
                    atk: atk,
                    def: def
                }).then(pokemonCapturado => {
                    res.status(201).json({
                        mensagem: 'Pokemon capturado com sucesso!',
                        pokemon: {
                            codigo: pokemonCapturado.codigo,
                            nome: pokemonCapturado.nome,
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        mensagem: 'O pokemon selvagem fugiu!',
                        erro: err
                    });
                });
            }
            else {
                res.status(401).json({
                    mensagem: 'O pokemon selvagem fugiu!'
                });
            }
        });
    };
}


exports.getAll = (req, res, next) => {
    Pokemon.findAll({
        order: [
            ['codigo', 'ASC']
        ],
        attributes: ['id','codigo','nome','tipoPokemon']
    }).then(pokemon => {
        res.status(200).json({
            mensagem: '--- PC ---',
            pokemon: pokemon
        });
    });
}

/*exports.getPokemon = (req, res, next) => {
    const tipoPokemon = req.body.tipoPokemon;
    Pokemon.findOne({
        order: [
            ['codigo']
        ],
        attributes: ['id','codigo','nome','tipoPokemon'],
        where: {
            tipoPokemon: tipoPokemon
        }
    }).then(pokemon => {
        res.status(200).json({
            mensagem: 'Pokemons do tipo encontrados',
            pokemon: pokemon
        });
    })
}
*/
exports.getOne = (req, res, next) => {
    const codigo = req.params.codigo;
    Pokemon.findOne({
        attributes: ['codigo', 'nome','tipoPokemon' ],
        where: {
            codigo: codigo
        }
    }).then(pokemon => {
        res.status(200).json({
            mensagem: 'Pokemon encontrado:',
            pokemon: pokemon
        });
    })   
}

exports.update = (req, res, next) => {
    const codigoAntigo = req.params.codigo;
    const codigo = req.body.codigo;
    const nome = req.body.nome;
    const tipoPokemon = req.body.tipoPokemon;

    Usuario.update({
        codigo: codigo,
        nome: nome,
        tipoPokemon: tipoPokemon
    },
        {
            where: {
                codigo: codigoAntigo
            }
        }).then(resultado => {
            res.status(201).json({
                mensagem: 'Pokemon evoluiu!'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Evolucao cancelada!'
            });
        });
}

exports.delete = (req, res, next) => {
    const codigo = req.params.codigo;

    Pokemon.destroy({
        where: {
            codigo: codigo
        }
    }).then(() => {
        res.status(200).json({
            mensagem: 'Pokemon solto na natureza com sucesso!'
        });
    });
}