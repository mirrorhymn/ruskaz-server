const { Genre } = require('../models/models');

class GenreController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const genre = await Genre.create({ name });
            return res.json(genre);
        } catch (e) {
            console.error('❌ Genre create error:', e);
            return res.status(500).json({ message: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const genres = await Genre.findAll();
            console.log('✅ Жанры успешно отданы:', genres.length);
            return res.json(genres);
        } catch (e) {
            console.error('❌ Genre getAll error:', e);
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new GenreController();