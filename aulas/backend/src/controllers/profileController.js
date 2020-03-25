const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization // começo acessando os dados da ong que está logada

        const incidents = await connection('incidents')
        .where('ong_id', ong_id) // buscando todos os incidentes que essa ong criou, 'ong_id' é o ong_id
        .select('*') // busca todos os campos desse incident

        return response.json(incidents)
    }
}