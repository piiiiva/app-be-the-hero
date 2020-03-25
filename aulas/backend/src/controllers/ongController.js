const crypto = require('crypto'); // apesar de ser para criptografia ele possui um método que pode ser usado para gerar uma string aleatória. E como esse pacote já está instalado no node.js não precisa ficar pegando nada de fora para fazer isso
const connection = require('../database/connection')

/**
 * A funçao toda foi definida com assincrona - async porque o método
 * insert de connections pode demorar um pouco e não podemos carregar
 * o response.json antes disso, entao utilizamos o await no insert e
 * ele só vai passar para o próximo passo quando tiver executado toda
 * a inserção de dados
 */

module.exports = {
    async index(request, response) { // listar todas as minhas ongs - index geralmente é o nome dado para o método que faz a listagem de todos os dados de uma tabela
        const ongs = await connection('ongs').select('*') // select('*) seleciona todos os campos de todos os registros de connection('ongs')
    
        return response.json(ongs)
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body // poderia ser const data. Mas é bom fazer a destructuring para pegar cada um desses dados em uma variável separada para garantir que o usuário não vai enviar um dado que não quero que ele preencha
    
        const id = crypto.randomBytes(4).toString('HEX') // criar o id com 4 caracteres
    
        await connection('ongs').insert({ // o método/funcao insert pode demorar um pouco
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id })
    }
}