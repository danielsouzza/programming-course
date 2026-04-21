const formCadastro = document.getElementById('content-cadastro')
const formLogin = document.getElementById('form-login')
const linkCriar = document.getElementById('link-criar-conta')
const linkLogin = document.getElementById('link-login')
const btnNovaTarefa = document.getElementById('btn-nova-tarefa')
const btnFecharModal = document.getElementById('btn-fechar-modal')
const modal = document.getElementById('modal-task')
const formCreateTask = document.getElementById('form-create-task')
const contentTasks = document.getElementById('list-my-task')




function initPage() {
    const auth = localStorage.getItem('auth')

    if (auth) {
        const contentLogin = document.getElementById('content-login')
        const pageTasks = document.getElementById('content-tasks')
        contentLogin.style.display = 'none'
        pageTasks.style.display = 'flex'
        getTasksByUser()
    }
}

btnNovaTarefa.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style.display = 'flex'

})

btnFecharModal.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style.display = 'none'

})

function renderTask(task) {


    const taskTemplate = document.createElement('div')

    taskTemplate.innerHTML = `
        <div class="task-item">
            <div class="task-title" id="${task.id}">
                <input type="text" style="display:none" value="${task.id}"/>
                <input type="checkbox" value="${task.done}"/>
                <div>${task.title}</div>
            </div>
            <div>Data: ${task.date}</div>
        </div>
    `
    contentTasks.appendChild(taskTemplate)

}

function getTasksByUser() {

    const auth = localStorage.getItem('auth')

    fetch('http://localhost:3000/task?user_id=' + auth, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).then(data => {

        contentTasks.innerHTML = ''
        data.data.forEach(element => {
            renderTask(element)
        });
    })
}

formCreateTask.addEventListener('submit', (e) => {
    e.preventDefault()
    const auth = localStorage.getItem('auth')

    console.log(auth)
    const data = {
        title: document.getElementById('input-task-titulo').value,
        date: document.getElementById('input-task-data').value,
        userId: auth
    }

    fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        modal.style.display = 'none'
        formCreateTask.reset()
        getTasksByUser()
        console.log(response)
    })
})


formCadastro.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('input-name').value
    const email = document.getElementById('input-email').value
    const password = document.getElementById('input-password').value

    const data = {
        name: name,
        email: email,
        password: password
    }

    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            alert('Erro ao cadastrar')
            throw new Error('Erro ao cadastrar')
        }

        return response.json()
    }).then(dados => {
        alert('Cadastro realizado com sucesso! user ID: ' + dados.id)
        formCadastro.reset()
    }).catch((error) => {
        console.error(error)
    })

})

formLogin.addEventListener('submit', (e) => {
    e.preventDefault()


    const data = {
        email: document.getElementById('login-input-email').value,
        password: document.getElementById('login-input-password').value
    }

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            alert('Credenciais incorretas')
            throw new Error('Erro ao logar')
        }

        return response.json()
    }).then(dados => {
        alert('Seja bem-vindo, ' + dados.user.name)
        localStorage.setItem('auth', dados.user.id)
        formLogin.reset()
        initPage()
    }).catch(erro => {
        console.error(erro)
    })
})

linkCriar.addEventListener('click', (e) => {
    e.preventDefault()

    const contentLogin = document.getElementById('content-login')
    const contentCreate = document.getElementById('content-cadastro')
    contentCreate.style.display = 'flex'
    contentLogin.style.display = 'none'


})

linkLogin.addEventListener('click', (e) => {
    e.preventDefault()

    const contentLogin = document.getElementById('content-login')
    const contentCreate = document.getElementById('content-cadastro')
    contentCreate.style.display = 'none'
    contentLogin.style.display = 'flex'
})

initPage()