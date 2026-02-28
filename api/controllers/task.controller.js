const { getDb } = require("../database");

async function index(req, res) {
    const { date, date_start, date_end, sorted, userId } = req.query;

    try {
        const db = await getDb();
        let query = 'SELECT * FROM tasks WHERE 1=1';
        let params = [];

        if (userId) {
            query += ' AND userId = ?';
            params.push(userId);
        }

        if (date) {
            query += ' AND date = ?';
            params.push(date);
        }

        if (date_start && date_end) {
            query += ' AND date >= ? AND date <= ?';
            params.push(date_start, date_end);
        }

        if (sorted === 'desc') {
            query += ' ORDER BY date DESC';
        } else if (sorted === 'asc') {
            query += ' ORDER BY date ASC';
        }

        const tasksFiltered = await db.all(query, params);
        res.json({ date: date, data: tasksFiltered });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tarefas', details: error.message });
    }
}

async function update(req, res) {
    const id = req.params.id;
    const { done, title, date } = req.body;

    try {
        const db = await getDb();
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);

        if (!task) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        let query = 'UPDATE tasks SET ';
        let params = [];
        let updates = [];

        if (done !== undefined) {
            updates.push('done = ?');
            params.push(done ? 1 : 0); // Boolean virando integer para o SQLite
        }
        if (title) {
            updates.push('title = ?');
            params.push(title);
        }
        if (date) {
            updates.push('date = ?');
            params.push(date);
        }

        if (updates.length > 0) {
            query += updates.join(', ') + ' WHERE id = ?';
            params.push(id);
            await db.run(query, params);

            const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
            res.json(updatedTask);
        } else {
            res.json(task);
        }

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa', details: error.message });
    }
}

async function store(req, res) {
    const { title, date, userId } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
    }

    // Validação básica se o usuário existe, se tivermos o ID
    if (userId) {
        try {
            const db = await getDb();
            const user = await db.get('SELECT id FROM users WHERE id = ?', [userId]);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado para vincular a tarefa' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao validar o usuário', details: error.message });
        }
    }

    try {
        const db = await getDb();
        const result = await db.run(
            'INSERT INTO tasks (title, date, userId) VALUES (?, ?, ?)',
            [title, date || null, userId || null]
        );

        const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', [result.lastID]);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa', details: error.message });
    }
}

async function destroy(req, res) {
    const id = req.params.id;

    try {
        const db = await getDb();
        const task = await db.get('SELECT id FROM tasks WHERE id = ?', [id]);

        if (!task) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        await db.run('DELETE FROM tasks WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a tarefa', details: error.message });
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
};