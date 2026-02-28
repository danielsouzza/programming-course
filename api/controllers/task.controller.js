const Task = require("../models/task.model");

const tasks = [];
let correntId = 1;

function index(req, res) {
    const date = req.query.date
    const date_start = req.query.date_start
    const date_end = req.query.date_end
    const sorted = req.query.sorted

    let tasksFiltered = tasks

    if (date) {
        tasksFiltered = tasksFiltered.filter(it => it.date == date)
    }

    if (date_start && date_end) {
        const date_s = new Date(date_start)
        const date_e = new Date(date_end)

        tasksFiltered = tasksFiltered.filter(it =>
            new Date(it.date) >= date_s &&
            new Date(it.date) <= date_e
        )
    }

    if (sorted == 'desc') {
        tasksFiltered = tasksFiltered.sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
        })
    } else if (sorted == 'asc') {
        tasksFiltered = tasksFiltered.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
    }



    res.json({ date: date, data: tasksFiltered })
}

function update(req, res) {
    const id = req.params.id
    const done = req.body.done;
    const title = req.body.title
    const date = req.body.date

    const task = tasks.find(it => it.id == id)

    if (!task) {
        return res.status(400).json({ error: 'Item não encontrado' })
    }

    if (done != undefined) {
        task.done = done
    }

    if (title) {
        task.title = title
    }


    res.json(task)
}

function store(req, res) {
    const title = req.body.title;
    const date = req.body.date

    if (!title) {
        return res.status(400).json({ error: 'Titulo é obrigatório' })
    }

    const task = new Task(
        correntId,
        title,
        date
    )

    tasks.push(task)
    correntId++;


    res.status(200).json(task)
}

function destroy(req, res) {
    const id = req.params.id

    const index = tasks.findIndex(it => it.id == id);

    if (index < 0) {
        return res.status(404).json({ error: "Item não encontrado" })
    }

    tasks.splice(index, 1)

    res.status(204).send()
}

module.exports = {
    index,
    store,
    update,
    destroy
}