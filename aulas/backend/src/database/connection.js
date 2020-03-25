const knex = require('knex')
const configuration = require('../../knexfile') // importa as config do banco de dados
// ../../ serve para voltar uma pasta.

const connection = knex(configuration.development) // cria nossa conexao passando como parametro a nossa config de desenvolvimento que está lá no knexfile.js

module.exports = connection