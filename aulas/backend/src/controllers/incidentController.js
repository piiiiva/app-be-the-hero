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
    },

    async delete(request, response) {
        const { id } = request.params // pegar o id que vemn de dentro do request.params
        const ong_id = request.headers.authorization // pegar o id da ong logada para verificar se o incident { id } realmente foi criado pela ong que está quero deletá-lo
    
        const incident = await connection('incidents')
            .where('id', id) // buscar um icidente ondeo id for igual ao id do request params
            .select('ong_id') // seleciono só a coluna on_id, nao preciso de todas
            .first()

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited.' }) // 401 - nao autorizado, codigo de status http
            
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send() // 204 status no content

    }

}