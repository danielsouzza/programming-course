const express = require('express');
const taskRouter = require('../api/routers/task.router')
const userRouter = require('../api/routers/user.router')
const app = express();
const port = 3000;

app.use(express.json())
app.use('/task', taskRouter)
app.use('/user', userRouter)


app.listen(port, () => {
    console.log('servidor iniciado')
})
