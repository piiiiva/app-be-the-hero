const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query // Buscar de dentro do requesty.query o param page e se ele nao existir vai ser 1

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // .join serve para adicionar na informação dados de outra tabela atendendo a condiçao de 'ongs.id', '=', 'incidents.ong_id' ... ou seja, se o pega ong_id de incidents e compara com o id de ongs e deixa disponível a informação
        .limit(5) // limitar os dados que essa busca vai fazer no banco para 5 registros 
        .offset((page -1) * 5) // pular 5 registros por página
        .select([
            'incidents.*', // pega todos os dados de incidents que serão mostrados
            'ongs.name', // pega só o campo name da tabela ongs .. nao daria para pegar todos os campos da tabela ongs, pq o id de ongs iria sobrepor o id de incidents
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'])

        response.header('X-Total-Count', count['count(*)']) // Utiliza o cabeçalho da resposta para nao ficar com os itens
        // X-Total-Count é o padrao para contagem. Conta todas os registros.

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