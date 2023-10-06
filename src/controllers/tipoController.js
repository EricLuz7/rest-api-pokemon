const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilidades = require('../utils/utils');


const Pokemon = require('../models/pokemon');
const Tipo = require('../models/tipo');

exports.create = (req, res, next) => {
    const nomeTipo = req.body.nomeTipo;

    if (nomeTipo === undefined){
        res.status(400).json({
            mensagem: 'Por favor preencha todos os campos'
        });
    }
    else {
        Tipo.findOne({
            where: {
                nomeTipo: nomeTipo
            }
        }).then(tipo => {
            if (tipo == undefined) {
                Tipo.create({
                    nomeTipo: nomeTipo
                }).then(tipoCriado => {
                    res.status(201).json({
                        mensagem: 'Tipo criado com sucesso!',
                        tipo: {                          
                            nomeTipo: tipoCriado.nomeTipo
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        mensagem: 'Ocorreu um erro ao cadastrar o tipo',
                        erro: err
                    });
                });
            }
            else {
                res.status(401).json({
                    mensagem: 'O tipo ja existe'
                });
            }
        });
    };
}

exports.getAll = (req, res, next) => {
    Tipo.findAll({
        order: [
            ['nomeTipo', 'ASC']
        ],
        attributes: ['nomeTipo']
    }).then(tipo => {
        res.status(200).json({
            mensagem: 'Todos os tipos:',
            tipo: tipo
        });
    });
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;
    Tipo.findOne({
        attributes: ['nomeTipo'],
        where: {
            id: id
        }
    }).then(tipo => {
        res.status(200).json({
            mensagem: 'Tipo encontrado:',
            tipo: tipo
        });
    });
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const nomeTipo = req.body.nomeTipo;

    Usuario.update({
        nomeTipo: nomeTipo
    },
        {
            where: {
                id: id
            }
        }).then(resultado => {
            res.status(201).json({
                mensagem: 'Tipo alterado!'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro na alteracao do tipo!'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Tipo.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({
            mensagem: 'Tipo excluido com sucesso!'
        });
    });
}