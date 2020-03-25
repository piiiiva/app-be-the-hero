const connection = require('../database/connection')

/**
 * Essa rota de login vai ter a única responsabilidade de verificar
 * se a ong existe para validar o login dela
 */

module.exports = {
    async create(request, response) {
        const { id } = request.body

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first()

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' })
        }

    return response.json(ong)
        
    }
}