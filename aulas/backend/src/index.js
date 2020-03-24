const express = require('express')
const routes = require('./routes') // o ./ é para referenciar a mesma pasta do arquivo index.js

const app = express()


app.use(express.json()) // to falando pro express ir lá no corpo da minha requisiçao e converter o json em um objeto entendível pelo javaScript
app.use(routes) // tem que ser abaixo do app.use(express.json())

/*
 * Rota / Recurso
*/

/*
 * Método HTTP
 *
 * GET: Buscar/Listar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma info rmação no back-end
 * DELETE: Deletar uma informação no back-end
*/

/*
 * Tipos de parâmetros
 *
 * Query Params: Parâmetros nomeados enviados na rota apos "?" (Filtros, paginação)
 * Route Params: Parâmtros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
*/

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where() --> melhor essa abordagem
 */



app.listen(3333) // localhost:33333 - nao usa a porta 80 porque pode ser problemática

