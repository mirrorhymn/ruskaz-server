const { Book, Genre } = require('../models/models');

class BookController {
    async create(req, res) {
        const { name, author, description, price, genreId } = req.body;
        const book = await Book.create({
            name,
            author,
            description,
            price,
            genreId
        });
        return res.json(book);
    }

    async getAll(req, res) {
        const { genreId } = req.query;
        let books;

        if (genreId) {
            books = await Book.findAll({ where: { genreId } });
        } else {
            books = await Book.findAll();
        }

        return res.json(books);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const book = await Book.findOne({ where: { id } });
        return res.json(book);
    }
}

module.exports = new BookController();