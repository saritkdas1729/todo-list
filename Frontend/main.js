const todo_list = ['Todo 11', 'Todo 22', 'Todo 33', 'Todo 44'];
const todo_container = document.querySelector('.todo-container');
const add_btn = document.querySelector('#add-btn');
const todo_input_box = document.getElementById('todo-input');
// console.log(todo_list);
// console.log(todo_container);

generateTodoView(todo_list, todo_container);

add_btn.addEventListener('click', addTodoEventHandler);
todo_input_box.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
        addTodoEventHandler(ev);
    }
});

function generateTodoView(todo_list, todo_container) {
    todo_container.innerHTML = "";
    todo_list.forEach((t) => {
        const todo = document.createElement('div');
        todo.classList.add('todo');
        todo.innerText = t;
        todo_container.appendChild(todo);
    });
}

function addTodoEventHandler(ev) {
    console.log(ev);
    const value = todo_input_box.value;

    if (value === null || value === '') {
        console.log('Please enter something in the input box');
        return;
    }
    todo_input_box.value = '';
    todo_list.push(value);
    generateTodoView(todo_list, todo_container);
}