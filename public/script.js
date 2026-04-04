const formCadastro = document.getElementById('form-cadastro')
const formLogin = document.getElementById('form-login')
const linkCriar = document.getElementById('link-criar-conta')
const linkLogin = document.getElementById('link-login')

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
        formLogin.reset()
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