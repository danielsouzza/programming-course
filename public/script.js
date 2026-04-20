const API_URL = 'http://localhost:3000';
const STORAGE_KEY = 'auth';

const formCadastro = document.getElementById('form-cadastro');
const formLogin = document.getElementById('form-login');
const linkCriar = document.getElementById('link-criar-conta');
const linkLogin = document.getElementById('link-login');

const contentLogin = document.getElementById('content-login');
const contentCadastro = document.getElementById('content-cadastro');
const contentTasks = document.getElementById('content-tasks');

const tasksList = document.getElementById('tasks-list');
const tasksCount = document.getElementById('tasks-count');
const btnOpenCreateModal = document.getElementById('btn-open-create-modal');
const btnCloseCreateModal = document.getElementById('btn-close-create-modal');
const btnCloseEditModal = document.getElementById('btn-close-edit-modal');
const btnLogout = document.getElementById('btn-logout');
const modalCreateBackdrop = document.getElementById('modal-create-backdrop');
const modalEditBackdrop = document.getElementById('modal-edit-backdrop');
const formCreateTask = document.getElementById('form-create-task');
const formEditTask = document.getElementById('form-edit-task');

let currentTasks = [];

function showOnly(section) {
    contentLogin.style.display = section === 'login' ? 'flex' : 'none';
    contentCadastro.style.display = section === 'cadastro' ? 'flex' : 'none';
    contentTasks.style.display = section === 'tasks' ? 'block' : 'none';
}

function getUserId() {
    return localStorage.getItem(STORAGE_KEY);
}

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
    }

    if (response.status === 204) return null;
    return response.json();
}

function formatDate(date) {
    if (!date) return 'Sem data';
    const [year, month, day] = date.split('-');
    if (!year || !month || !day) return date;
    return `${day}/${month}/${year}`;
}

function renderTasks(tasks) {
    tasksList.innerHTML = '';
    tasksCount.textContent = `${tasks.length} tarefa(s)`;

    if (tasks.length === 0) {
        tasksList.innerHTML = '<li class="task-item">Nenhuma tarefa cadastrada.</li>';
        return;
    }

    for (const task of tasks) {
        const item = document.createElement('li');
        item.className = 'task-item';
        item.innerHTML = `
            <div class="task-left">
                <input type="checkbox" class="checkbox-done" data-id="${task.id}" ${task.done ? 'checked' : ''} />
                <div class="task-main">
                    <strong class="task-title ${task.done ? 'done' : ''}">${task.title || 'Sem titulo'}</strong>
                    <span class="task-date">${formatDate(task.date)}</span>
                </div>
            </div>
            <div class="task-actions">
                <button type="button" class="btn-edit btn-secondary" data-id="${task.id}">Editar</button>
                <button type="button" class="btn-delete btn-danger" data-id="${task.id}">Excluir</button>
            </div>
        `;
        tasksList.appendChild(item);
    }
}

async function loadTasks() {
    const userId = getUserId();
    if (!userId) return;

    const response = await request(`/task?userId=${userId}`);
    currentTasks = response.data || [];
    renderTasks(currentTasks);
}

function openCreateModal() {
    modalCreateBackdrop.classList.remove('hidden');
}

function closeCreateModal() {
    formCreateTask.reset();
    modalCreateBackdrop.classList.add('hidden');
}

function openEditModal(task) {
    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('edit-task-title').value = task.title || '';
    document.getElementById('edit-task-date').value = task.date || '';
    modalEditBackdrop.classList.remove('hidden');
}

function closeEditModal() {
    formEditTask.reset();
    modalEditBackdrop.classList.add('hidden');
}

async function initPage() {
    const auth = getUserId();
    if (auth) {
        showOnly('tasks');
        await loadTasks();
        return;
    }
    showOnly('login');
}

formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById('input-name').value,
        email: document.getElementById('input-email').value,
        password: document.getElementById('input-password').value
    };

    try {
        const dados = await request('/user', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        alert(`Cadastro realizado com sucesso! user ID: ${dados.id}`);
        formCadastro.reset();
        showOnly('login');
    } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar');
    }
});

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        email: document.getElementById('login-input-email').value,
        password: document.getElementById('login-input-password').value
    };

    try {
        const dados = await request('/user/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        alert(`Seja bem-vindo, ${dados.user.name}`);
        localStorage.setItem(STORAGE_KEY, String(dados.user.id));
        formLogin.reset();
        showOnly('tasks');
        await loadTasks();
    } catch (erro) {
        console.error(erro);
        alert('Credenciais incorretas');
    }
});

formCreateTask.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById('create-task-title').value,
        date: document.getElementById('create-task-date').value || null,
        userId: Number(getUserId())
    };

    try {
        await request('/task', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        closeCreateModal();
        await loadTasks();
    } catch (error) {
        console.error(error);
        alert('Erro ao criar tarefa');
    }
});

formEditTask.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskId = document.getElementById('edit-task-id').value;

    const data = {
        title: document.getElementById('edit-task-title').value,
        date: document.getElementById('edit-task-date').value || null
    };

    try {
        await request(`/task/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        closeEditModal();
        await loadTasks();
    } catch (error) {
        console.error(error);
        alert('Erro ao editar tarefa');
    }
});

tasksList.addEventListener('click', async (e) => {
    const target = e.target;
    const id = target.dataset.id;
    if (!id) return;

    if (target.classList.contains('btn-delete')) {
        try {
            await request(`/task/${id}`, { method: 'DELETE' });
            await loadTasks();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir tarefa');
        }
    }

    if (target.classList.contains('btn-edit')) {
        const task = currentTasks.find((item) => String(item.id) === String(id));
        if (task) openEditModal(task);
    }
});

tasksList.addEventListener('change', async (e) => {
    const target = e.target;
    if (!target.classList.contains('checkbox-done')) return;

    const id = target.dataset.id;
    try {
        await request(`/task/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ done: target.checked })
        });
        await loadTasks();
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar status da tarefa');
    }
});

linkCriar.addEventListener('click', (e) => {
    e.preventDefault();
    showOnly('cadastro');
});

linkLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showOnly('login');
});

btnOpenCreateModal.addEventListener('click', openCreateModal);
btnCloseCreateModal.addEventListener('click', closeCreateModal);
btnCloseEditModal.addEventListener('click', closeEditModal);

modalCreateBackdrop.addEventListener('click', (e) => {
    if (e.target === modalCreateBackdrop) closeCreateModal();
});

modalEditBackdrop.addEventListener('click', (e) => {
    if (e.target === modalEditBackdrop) closeEditModal();
});

btnLogout.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    currentTasks = [];
    renderTasks(currentTasks);
    showOnly('login');
});

initPage();