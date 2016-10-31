import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState} from './actions';

export function registerEventHandlers() {
    listen('keypress', '#todoInput', event => {
        let key = event.which || event.keyCode;
        if (key == '13') {
            todos.dispatch(addTodo(todoInput.value));
            todoInput.focus();
            return false;
        }
    });

    listen('click', '#addTodo', event => {
        const todoInput = document.getElementById('todoInput');
        todos.dispatch(addTodo(todoInput.value));
        event.stopPropagation();
    });

    listen('click', '.js_toggle_todo', event => {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        todos.dispatch(toggleTodoState(id));
    });
}
