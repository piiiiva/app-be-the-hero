const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const incidents = await connection('incidents').select('*')

        return response.json(incidents)
    },

    async create(request, response) {
        const { titulo, description, value } = request.body
        const ong_id = request.headers.authorization // o id é autenticado .. entao ele vem através do cabeçalho da requisição e nao no corpo no headers normalmente vem dados da autenticacao do usuário, localizaçao, idioma ... tudo o que caracteriza o contexto da requisiçao

        const [id] = await connection('incidents').insert({
            titulo,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    }

}