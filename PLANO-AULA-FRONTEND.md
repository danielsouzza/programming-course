# Plano de Aula - Frontend de Tasks (JS puro)

## Objetivo da aula

Construir e explicar o frontend completo da aplicacao de tarefas, mantendo login/cadastro existentes e implementando o fluxo depois do login:

- listar tarefas do usuario;
- criar tarefa (modal);
- editar tarefa (modal);
- marcar tarefa como concluida (checkbox);
- excluir tarefa.

---

## Roteiro da aula (90 a 120 min)

### 1) Contexto e revisao da arquitetura (10 min)

- Backend ja pronto com rotas:
  - `POST /user`
  - `POST /user/login`
  - `GET /task?userId=...`
  - `POST /task`
  - `PUT /task/:id`
  - `DELETE /task/:id`
- Frontend em HTML + CSS + JS sem framework.

### 2) Estado da interface (10 min)

- `localStorage` com chave `auth` para guardar `userId`.
- Regras:
  - com `auth`: esconde login e mostra tasks;
  - sem `auth`: mostra login.

### 3) Estrutura de componentes no HTML (15 min)

- Secao de cadastro (`#content-cadastro`)
- Secao de login (`#content-login`)
- Secao de tarefas (`#content-tasks`)
- Modal de criar (`#modal-create-backdrop`)
- Modal de editar (`#modal-edit-backdrop`)

### 4) Listagem e renderizacao (15 min)

- Buscar tarefas com `GET /task?userId=...`
- Renderizar itens em `#tasks-list`
- Mostrar total em `#tasks-count`

### 5) CRUD da tarefa (20 min)

- Criar: submit de `#form-create-task` para `POST /task`
- Editar: submit de `#form-edit-task` para `PUT /task/:id`
- Concluir: evento `change` no checkbox para `PUT /task/:id` com `{ done }`
- Excluir: clique em botao para `DELETE /task/:id`

### 6) UX basica e responsividade (10 min)

- Modal com overlay full-screen
- Feedback visual em botao, foco e responsividade

### 7) Fechamento e proxima aula (10 min)

- Refatoracao sugerida:
  - separar render em funcoes menores;
  - tratar erros por mensagem de API;
  - substituir `alert` por toast.

---

## Componentes e seus CSS

## 1) Base/global

### Componente

- Estrutura global da pagina (`body`, container principal `body > div`)

### CSS relacionado

- `:root`
- `body`
- `body>div`

---

## 2) Cadastro

### Componente

- Secao: `#content-cadastro` / `.content-cadastro`
- Form: `#form-cadastro`
- Campos: `#input-name`, `#input-email`, `#input-password`
- Link: `#link-login`

### CSS relacionado

- `.content-cadastro`
- `.content-login form, .content-cadastro`

---

## 3) Login

### Componente

- Secao: `#content-login` / `.content-login`
- Coluna esquerda: `.content-left`
- Coluna direita: `.content-right`
- Form: `#form-login`
- Titulo interno: `.text-logi`
- Blocos de campo: `.input`
- Area de acoes: `.btn`
- Texto auxiliar: `.btn-desc`
- Link para cadastro: `#link-criar-conta`

### CSS relacionado

- `.content-login`
- `.content-left`
- `.content-left img`
- `.content-left p`
- `.content-left div`
- `.content-right`
- `.content-right form`
- `.content-right form .text-logi`
- `.btn`
- `.btn button`
- `.btn .btn-desc`
- `.btn .btn-desc span`
- `.input`
- `.input label`
- `.input input`
- `@media (min-width: 900px) { .content-left img }`
- `@media (min-width: 600px) { .content-login }`
- `@media (min-width: 600px) { .content-right form }`
- `@media (min-width: 600px) { .btn }`
- `@media (min-width: 600px) { .content-left }`

---

## 4) Dashboard de tarefas (pos-login)

### Componente

- Secao: `#content-tasks` / `.content-tasks-page`
- Cabecalho: `.tasks-header`
- Contador: `#tasks-count`
- Acoes: `.tasks-actions`
- Botoes:
  - `#btn-open-create-modal`
  - `#btn-logout` (`.btn-secondary`)
- Lista: `#tasks-list` / `.tasks-list`

### CSS relacionado

- `.content-tasks` (legado, pode ser removido no futuro)
- `.content-tasks-page`
- `.tasks-header`
- `.tasks-header h2`
- `.tasks-header p`
- `.tasks-actions`
- `.tasks-actions button, .task-actions button, .modal-actions button`
- `.btn-secondary`
- `.btn-danger`
- `.tasks-list`

---

## 5) Item de tarefa

### Componente (renderizado via JS)

- Item: `.task-item`
- Lado esquerdo: `.task-left`
- Conteudo: `.task-main`
- Titulo: `.task-title`
- Titulo concluido: `.task-title.done`
- Data: `.task-date`
- Acoes: `.task-actions`
- Checkbox de done: `.checkbox-done` (classe aplicada no JS)
- Botao editar: `.btn-edit` + `.btn-secondary`
- Botao excluir: `.btn-delete` + `.btn-danger`

### CSS relacionado

- `.task-item`
- `.task-left`
- `.task-main`
- `.task-title.done`
- `.task-date`
- `.task-actions`
- `.btn-secondary`
- `.btn-danger`

---

## 6) Modal de criar tarefa

### Componente

- Overlay: `#modal-create-backdrop` (`.modal-backdrop`)
- Conteiner: `.modal`
- Form: `#form-create-task` (`.modal-form`)
- Campos: `#create-task-title`, `#create-task-date`
- Acoes: `.modal-actions`
- Botoes:
  - submit "Salvar"
  - `#btn-close-create-modal` (`.btn-secondary`)

### CSS relacionado

- `.modal-backdrop`
- `.modal`
- `.modal h3`
- `.modal-form`
- `.modal-form label`
- `.modal-form input`
- `.modal-form input:focus`
- `.modal-actions`
- `.modal-actions button`
- `.modal-actions button[type="submit"]`
- `.modal-actions .btn-secondary`
- `@media (max-width: 600px) { .modal }`
- `@media (max-width: 600px) { .modal h3 }`
- `@media (max-width: 600px) { .modal-actions }`
- `@media (max-width: 600px) { .modal-actions button }`

---

## 7) Modal de editar tarefa

### Componente

- Overlay: `#modal-edit-backdrop` (`.modal-backdrop`)
- Conteiner: `.modal`
- Form: `#form-edit-task` (`.modal-form`)
- Campos: `#edit-task-id`, `#edit-task-title`, `#edit-task-date`
- Acoes: `.modal-actions`
- Botoes:
  - submit "Atualizar"
  - `#btn-close-edit-modal` (`.btn-secondary`)

### CSS relacionado

- Reaproveita exatamente o mesmo CSS do modal de criar:
  - `.modal-backdrop`
  - `.modal`
  - `.modal h3`
  - `.modal-form`
  - `.modal-form label`
  - `.modal-form input`
  - `.modal-form input:focus`
  - `.modal-actions`
  - `.modal-actions button`
  - `.modal-actions button[type="submit"]`
  - `.modal-actions .btn-secondary`
  - media query de mobile para modal

---

## 8) Utilitario de visibilidade

### Componente

- Classe de controle de exibicao: `.hidden`

### CSS relacionado

- `.hidden { display: none; }`

---

## Fluxo funcional resumido (para guiar explicacao em sala)

1. Usuario faz login.
2. JS salva `userId` em `localStorage`.
3. JS esconde login e mostra `#content-tasks`.
4. JS consulta `GET /task?userId=...`.
5. JS renderiza lista e conecta eventos:
   - criar;
   - editar;
   - done por checkbox;
   - excluir.
6. Logout limpa `auth` e volta para tela de login.

---

## Parte do Script (JS) - mapa para explicar em aula

## 1) Constantes e referencias de DOM

### Objetivo

Centralizar configuracao da API e capturar os elementos HTML que o script controla.

### Itens principais no `script.js`

- `API_URL` e `STORAGE_KEY`
- Formularios:
  - `formCadastro`
  - `formLogin`
  - `formCreateTask`
  - `formEditTask`
- Secoes:
  - `contentLogin`
  - `contentCadastro`
  - `contentTasks`
- Lista de tarefas:
  - `tasksList`
  - `tasksCount`
- Modais:
  - `modalCreateBackdrop`
  - `modalEditBackdrop`
- Botoes de acao:
  - `btnOpenCreateModal`
  - `btnCloseCreateModal`
  - `btnCloseEditModal`
  - `btnLogout`

### Teoria para explicar

- "DOM reference caching": pegar elementos uma vez e reutilizar.
- Facilita leitura e evita chamadas repetidas de `document.getElementById`.

---

## 2) Estado em memoria

### Objetivo

Guardar lista atual de tarefas para abrir modal de edicao e re-renderizar.

### Item

- `let currentTasks = [];`

### Teoria para explicar

- Diferenca entre estado persistente (`localStorage`) e estado em memoria (variavel JS).

---

## 3) Funcoes utilitarias

### `showOnly(section)`

- Controla qual secao aparece: login, cadastro ou tasks.

### `getUserId()`

- Le `auth` do `localStorage`.

### `request(path, options)`

- Wrapper de `fetch` para padronizar chamadas HTTP.
- Ja trata erro de status e `204 No Content`.

### `formatDate(date)`

- Formata `YYYY-MM-DD` para `DD/MM/YYYY`.

### Teoria para explicar

- DRY: evitar repetir codigo de fetch e tratamento de erro em cada evento.

---

## 4) Renderizacao da lista

### `renderTasks(tasks)`

- Limpa lista anterior.
- Atualiza contador (`tasksCount`).
- Renderiza estado vazio quando nao ha tarefas.
- Cria cada item com:
  - checkbox done;
  - titulo/data;
  - botao editar;
  - botao excluir.

### `loadTasks()`

- Busca tarefas da API via `GET /task?userId=...`.
- Salva resposta em `currentTasks`.
- Chama `renderTasks`.

### Teoria para explicar

- Separacao de responsabilidades:
  - `loadTasks` = dados
  - `renderTasks` = interface

---

## 5) Controle de modais

### Funcoes

- `openCreateModal()`
- `closeCreateModal()`
- `openEditModal(task)`
- `closeEditModal()`

### Regras

- Abrir: remove classe `.hidden`.
- Fechar: adiciona `.hidden` e reseta form.
- Editar: preenche campos antes de abrir.

---

## 6) Inicializacao da pagina

### `initPage()`

- Se existe `auth`:
  - mostra tasks;
  - carrega lista.
- Se nao existe:
  - mostra login.

### Teoria para explicar

- Esse passo funciona como "roteamento simples por estado de autenticacao".

---

## 7) Eventos de autenticacao

### Cadastro (`formCadastro submit`)

- Monta payload com nome/email/senha.
- Chama `POST /user`.
- Em sucesso: limpa form e volta para login.

### Login (`formLogin submit`)

- Monta payload com email/senha.
- Chama `POST /user/login`.
- Em sucesso:
  - salva `dados.user.id` no `localStorage`;
  - mostra tela de tasks;
  - chama `loadTasks`.

---

## 8) Eventos de CRUD de tarefas

### Criar (`formCreateTask submit`)

- `POST /task` com `title`, `date`, `userId`.
- Fecha modal e recarrega lista.

### Editar (`formEditTask submit`)

- `PUT /task/:id` com novo `title` e `date`.
- Fecha modal e recarrega lista.

### Excluir e abrir edicao (`tasksList click`)

- Event delegation:
  - `.btn-delete` -> `DELETE /task/:id`
  - `.btn-edit` -> busca em `currentTasks` e abre modal

### Marcar como concluida (`tasksList change`)

- Quando altera `.checkbox-done`, chama:
  - `PUT /task/:id` com `{ done: true/false }`

---

## 9) Eventos de navegacao e UX

### Navegacao entre login/cadastro

- `linkCriar click` -> `showOnly('cadastro')`
- `linkLogin click` -> `showOnly('login')`

### Acoes de modal

- Botao abrir modal criar.
- Botoes fechar modal criar/editar.
- Clique no fundo (overlay) fecha modal.

### Logout

- Remove `auth` do `localStorage`.
- Limpa `currentTasks`.
- Renderiza vazio e volta para login.

---

## 10) Ordem didatica recomendada para explicar o script

1. Constantes e referencias DOM.
2. Estado (`currentTasks` e `localStorage`).
3. Utilitarios (`showOnly`, `request`, `formatDate`).
4. `renderTasks` e `loadTasks`.
5. Handlers de login/cadastro.
6. Handlers de criar/editar/done/excluir.
7. Handlers de modal e logout.
8. `initPage()` e por que ele roda no final.

---

## Componentes (codigo puro para aula)

### 1) Componente da area de tarefas

```html
<section id="content-tasks" class="content-tasks-page">
  <div class="tasks-header">
    <div>
      <h2>Minhas tarefas</h2>
      <p id="tasks-count">0 tarefa(s)</p>
    </div>
    <div class="tasks-actions">
      <button type="button" id="btn-open-create-modal">Nova tarefa</button>
      <button type="button" id="btn-logout" class="btn-secondary">Sair</button>
    </div>
  </div>
  <ul id="tasks-list" class="tasks-list"></ul>
</section>
```

### 2) Componente modal de criar

```html
<div class="modal-backdrop hidden" id="modal-create-backdrop">
  <div class="modal">
    <h3>Criar tarefa</h3>
    <form id="form-create-task" class="modal-form">
      <label for="create-task-title">Titulo</label>
      <input type="text" id="create-task-title" required />

      <label for="create-task-date">Data</label>
      <input type="date" id="create-task-date" />

      <div class="modal-actions">
        <button type="submit">Salvar</button>
        <button type="button" id="btn-close-create-modal" class="btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</div>
```

### 3) Componente modal de editar

```html
<div class="modal-backdrop hidden" id="modal-edit-backdrop">
  <div class="modal">
    <h3>Editar tarefa</h3>
    <form id="form-edit-task" class="modal-form">
      <input type="hidden" id="edit-task-id" />
      <label for="edit-task-title">Titulo</label>
      <input type="text" id="edit-task-title" required />

      <label for="edit-task-date">Data</label>
      <input type="date" id="edit-task-date" />

      <div class="modal-actions">
        <button type="submit">Atualizar</button>
        <button type="button" id="btn-close-edit-modal" class="btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</div>
```

### 4) CSS puro dos componentes de task/modal

```css
.content-tasks-page {
  display: none;
  color: #ffffff;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.tasks-list {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  border-radius: 12px;
  background: #ffffff;
  color: #111111;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 20;
}

.modal {
  width: min(100%, 420px);
  background: #ffffff;
  color: #111111;
  border-radius: 18px;
  padding: 22px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.hidden {
  display: none;
}
```

---

## Script puro completo (base da aula)

```js
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

  if (!response.ok) throw new Error(`Erro HTTP ${response.status}`);
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
    const dados = await request('/user', { method: 'POST', body: JSON.stringify(data) });
    alert(`Cadastro realizado com sucesso! user ID: ${dados.id}`);
    formCadastro.reset();
    showOnly('login');
  } catch (error) {
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
    const dados = await request('/user/login', { method: 'POST', body: JSON.stringify(data) });
    localStorage.setItem(STORAGE_KEY, String(dados.user.id));
    formLogin.reset();
    showOnly('tasks');
    await loadTasks();
  } catch (error) {
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
    await request('/task', { method: 'POST', body: JSON.stringify(data) });
    closeCreateModal();
    await loadTasks();
  } catch (error) {
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
    await request(`/task/${taskId}`, { method: 'PUT', body: JSON.stringify(data) });
    closeEditModal();
    await loadTasks();
  } catch (error) {
    alert('Erro ao editar tarefa');
  }
});

tasksList.addEventListener('click', async (e) => {
  const target = e.target;
  const id = target.dataset.id;
  if (!id) return;

  if (target.classList.contains('btn-delete')) {
    await request(`/task/${id}`, { method: 'DELETE' });
    await loadTasks();
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
  await request(`/task/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ done: target.checked })
  });
  await loadTasks();
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
```

