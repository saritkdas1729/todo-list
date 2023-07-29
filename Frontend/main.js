const todo_list = ['Todo 11', 'Todo 22', 'Todo 33', 'Todo 44'];
const todo_container = document.querySelector('.todo-container');
const add_btn = document.getElementById('add-btn');
const todo_input_box = document.getElementById('todo-input');

generateTodoView(todo_list, todo_container);

add_btn.addEventListener('click', (ev) => {
    addTodoEventHandler(todo_list, todo_input_box, todo_container);
});
todo_input_box.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
        addTodoEventHandler(todo_list, todo_input_box, todo_container);
    }
});

todo_input_box.addEventListener('input', (ev) => {
    if (todo_input_box.classList.contains('input-error')) {
        todo_input_box.classList.remove('input-error');
    }
    todo_input_box.placeholder = 'write todos here ...';
})

function generateTodoView(todo_list, todo_container) {
    todo_container.innerHTML = "";
    todo_list.forEach((t) => {
        const todo = document.createElement('div');
        todo.classList.add('todo');
        todo.innerText = t;
        todo_container.appendChild(todo);
    });
}

function addTodoEventHandler(todo_list, todo_input_box, todo_container) {
    const value = todo_input_box.value;

    if (value === null || value === '') {
        if (!todo_input_box.classList.contains('input-error')) {
            todo_input_box.classList.add('input-error');
            todo_input_box.placeholder = 'please enter a todo here';           
        }
        return;
    }

    todo_input_box.value = '';
    todo_list.push(value);
    generateTodoView(todo_list, todo_container);
}