import {isEnabled} from './lib/feature';

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderInput(),
        renderTodos(todoItems)
    );
}

function renderApp(input, todoList) {
    if(isEnabled('renderBottom') && !isEnabled('filter')) {
        return renderAddTodoAtBottom(input, todoList);
    } else if(isEnabled('filter') && !isEnabled('renderBottom')) {
        return renderAddFilter(input, todoList);
    } else if(isEnabled('filter') && isEnabled('renderBottom') && isEnabled('filterTop')) {
        return renderAddFilterTop(input, todoList);
    } else {
        return renderAddTodoAtTop(input, todoList);
    }
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return renderTodoTitle() + `<div class="todo__input"><input type="text" id="todoInput" autofocus placeholder="Add a task"><button id="addTodo"><i class="material-icons">add_circle_outline</i></button></div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="radio" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        <span>${todo.text}</span>
    </li>`;
}

function renderTodoTitle() {
    return `<h1 class="todo--title">TodoList</h1>`;
}

function getFilter(input, todoList) {
    return `<form class="filter">
        <label>
            <input id="all" type="radio" name="filter" value="all" checked>Todos
        </label>
        <label>
            <input id="open" type="radio" name="filter" value="open">Abertos
        </label>
        <label>
            <input id="close" type="radio" name="filter" value="close">Fechados
        </label>
    </form>`
}

function renderAddFilter(input, todoList) {
    return `<div id="app">
            ${todoList}`
            + getFilter() +
            `</div>`;
}

function renderAddFilterTop(input, todoList) {
    return`<div id="app">`
            + getFilter() +
            `${todoList} </div>`
            + renderInput();
}
