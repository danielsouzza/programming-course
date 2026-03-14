const { getDb } = require('../database');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async getTasks() {
        const db = await getDb();
        const tasks = await db.all('SELECT * FROM tasks WHERE userId = ?', [this.id]);
        return tasks;
    }
}

module.exports = User;