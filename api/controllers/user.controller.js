const { getDb } = require('../database');

async function store(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try {
        // Beging transation
        const db = await getDb();
        const result = await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password])
        res.status(201).json({ id: result.lastID, name, email })
        // Commit
    } catch (error) {
        // Rollback
        if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(400).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const db = await getDb()
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email])

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (user.password != password) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const userModel = new User(user.id, user.name, user.email);
        const tasks = await userModel.tasks();

        res.json({ user: userModel, tasks: tasks });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }

}

const User = require('../models/user.model');

async function index(req, res) {
    try {
        const db = await getDb();
        const usersData = await db.all('SELECT id, name, email FROM users');

        const users = [];

        for (let data of usersData) {
            const user = new User(data.id, data.name, data.email);
            users.push({
                id: user.id,
                name: user.name,
                email: user.email,
            });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
}

module.exports = {
    index,
    store,
    login
};