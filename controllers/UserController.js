const { User, Basket } = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET не найден в .env файле!');
    }
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

class UserController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Некорректный email или password" });
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с таким email уже существует" });
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, password: hashPassword, role: 'USER' });

            await Basket.create({ userId: user.id });

            const token = generateJwt(user.id, user.email, user.role);

            console.log('✅ Регистрация успешна:', email);
            return res.json({ token });
        } catch (e) {
            console.error('❌ Ошибка при регистрации:', e.message);
            return res.status(500).json({ message: e.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ message: "Пользователь не найден" });
            }

            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ message: "Неверный пароль" });
            }

            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            console.error('❌ Ошибка при логине:', e.message);
            return res.status(500).json({ message: e.message });
        }
    }

    async check(req, res) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({ token });
        } catch (e) {
            console.error('❌ Ошибка check:', e.message);
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new UserController();