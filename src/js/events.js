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

    listen('click', '#all', event => {
        let item = document.querySelectorAll('.todo__item');
        for(let i in item) {
            item[i].classList.remove('close');
        }
    });

    listen('click', '#close', event => {
        const closes = document.querySelectorAll('.todo__item--done');
        const opens = document.querySelectorAll('.todo__item--open');
        for(let i in (closes + opens)) {
            closes[i].classList.remove('close');
            opens[i].classList.add('close');
        }
    });

    listen('click', '#open', event => {
        const closes = document.querySelectorAll('.todo__item--done');
        const opens = document.querySelectorAll('.todo__item--open');
        for(let i in (closes + opens)) {
            closes[i].classList.add('close');
            opens[i].classList.remove('close');
        }
    })
}
