const express = require('express')

const routes = express()

routes.post('/users', (request, response) => { // poderia ser function ('req', 'res')
    const body = request.body
    console.log(body)

    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Rodrigo Diego Piva'
    })
})

module.exports = routes