require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// 🔥 ЭТО САМЫЙ НАДЁЖНЫЙ CORS ДЛЯ ТВОЕГО СЛУЧАЯ
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    console.log(`📡 [${req.method}] ${req.url}`);   // ← будем видеть все запросы

    if (req.method === 'OPTIONS') {
        console.log('✅ OPTIONS (preflight) обработан');
        return res.status(204).end();
    }
    next();
});

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('<h1 style="padding:100px; text-align:center; background:#6c5ce7; color:white;">✅ Сервер РуСказ работает на 5001</h1>');
});

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ База данных подключена');

        await sequelize.sync({ alter: true });
        console.log('✅ Таблицы синхронизированы');

        app.listen(5001, () => {
            console.log('🚀 Сервер запущен на http://localhost:5001');
        });
    } catch (e) {
        console.error('❌ Ошибка запуска:', e);
    }
};

start();