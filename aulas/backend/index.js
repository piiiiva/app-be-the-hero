const express = require('express')

const app = express()

app.get('/', (request, response) => { // poderia ser function ('req', 'res')
    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Rodrigo Piva'
    })
})

app.listen(3333) // localhost:33333 - nao usa a porta 80 porque pode ser problemática

