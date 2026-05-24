const { Genre, Book } = require('./models/models');

const seed = async () => {
    try {
        await Genre.bulkCreate([
            { name: 'Волшебные' },
            { name: 'Бытовые' },
            { name: 'Про животных' },
            { name: 'Небылицы' }
        ]);

        await Book.bulkCreate([
            { name: 'Колобок', author: 'Русская народная сказка', description: 'Сможет ли Колобок перехитрить хитрого лиса?', price: 0, genreId: 1 },
            { name: 'Три поросёнка', author: 'Русская народная сказка', description: 'Устоит ли самый крепкий домик против серого волка?', price: 0, genreId: 3 }
        ]);

        console.log('✅ Тестовые данные добавлены');
    } catch (e) {
        console.log('Данные уже существуют или ошибка:', e.message);
    }
};

seed();