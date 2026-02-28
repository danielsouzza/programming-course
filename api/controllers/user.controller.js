const { getDb } = require('../database');
const bcrypt = require('bcryptjs'); // Usaremos bcrypt para senhas eventualmente, mas por hora vamos simples
// Ops, esqueci que é só didático: vamos salvar a senha em texto puro por agora pra facilitar pra ele.

async function store(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const db = await getDb();
        const result = await db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );

        res.status(201).json({ id: result.lastID, name, email });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: 'E-mail já cadastrado' });
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
        const db = await getDb();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Retornamos os dados sem a senha
        res.json({ message: 'Login efetuado com sucesso', user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }
}

const User = require('../models/user.model');

async function index(req, res) {
    try {
        const db = await getDb();
        const usersData = await db.all('SELECT id, name, email FROM users');

        // Para cada usuário, instanciamos o Model e chamamos a função dele
        const users = [];

        for (let data of usersData) {
            const user = new User(data.id, data.name, data.email);
            const tasks = await user.getTasks();

            // Retornamos um objeto simples para o JSON, omitindo métodos da classe
            users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                tasks: tasks
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