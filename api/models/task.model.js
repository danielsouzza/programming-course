class Task {
    constructor(id, title, date, done = false, userId = null) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.done = done;
        this.userId = userId;
    }
}

module.exports = Task;