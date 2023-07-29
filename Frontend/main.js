const todo_container = document.querySelector('.todo-container');
const add_btn = document.getElementById('add-btn');
const todo_input_box = document.getElementById('todo-input');

// fetch all todos from server and 
// populate todo_container using
// generateTodoView
fetch('http://localhost:8085/todo/')
.then((resp) => resp.json())
.then((data) => {
    generateTodoView(data, todo_container);
})
.catch((err) => {
    console.log('Error : ', err);
})

add_btn.addEventListener('click', (ev) => {
    addTodoEventHandler(todo_input_box, todo_container);
});
todo_input_box.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
        addTodoEventHandler(todo_input_box, todo_container);
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
        todo.innerText = t.todo;
        todo_container.appendChild(todo);
    });
}

function addTodoEventHandler(todo_input_box, todo_container) {
    const value = todo_input_box.value;

    if (value === null || value === '') {
        if (!todo_input_box.classList.contains('input-error')) {
            todo_input_box.classList.add('input-error');
            todo_input_box.placeholder = 'please enter a todo here';           
        }
        return;
    }

    todo_input_box.value = '';
    fetch('http://localhost:8085/todo/', {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({"todo" : value})
    })
    .then((resp) => fetch('http://localhost:8085/todo/'))
    .then((resp) => resp.json())
    .then((todo_list) => {
        generateTodoView(todo_list, todo_container);
    })
    .catch((err) => {
        console.log(err);
    })
}