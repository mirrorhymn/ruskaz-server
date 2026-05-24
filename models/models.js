const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Book = sequelize.define('book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING }
});

const Genre = sequelize.define('genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const BasketBook = sequelize.define('basket_book', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

// Связи
User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketBook);
BasketBook.belongsTo(Basket);

Book.hasMany(BasketBook);
BasketBook.belongsTo(Book);

Genre.hasMany(Book);
Book.belongsTo(Genre);

module.exports = {
    User,
    Basket,
    Book,
    Genre,
    BasketBook
};