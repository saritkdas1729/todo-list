const api = {}
const view = {}

api.getAllTodos = async () => {
    const resp = await fetch('http://localhost:8085/todo/');
    if (!resp.ok) return [];
    return await resp.json();
}

api.addTodo = async (todo) => {
    const resp = await fetch('http://localhost:8085/todo/', 
                        {
                            method : "POST",
                            headers : {
                                "Content-Type": "application/json"
                            },
                            body : JSON.stringify(todo)
                        });
    if (!resp.ok) return null;
    return await resp.json();
}

api.deleteById = async (id) => {
    const resp = await fetch('http://localhost:8085/todo/' + id, 
    {
        method : "DELETE",
        headers : {
                      "Content-Type": "application/json"
                  }
    });
}

view.renderTodos = (todo_list, todo_container) => {
    todo_container.innerHTML = "";
    todo_list.forEach((t) => {
        const todo = document.createElement('div');
        todo.classList.add('todo');

        const todo_text = document.createElement('div');
        todo_text.classList.add('todo-text');
        todo_text.innerText = t.todo;
        todo.appendChild(todo_text);

        const delete_icon = document.createElement('i');
        delete_icon.classList.add('fa-solid');
        delete_icon.classList.add('fa-trash');
        delete_icon.classList.add('btn');
        delete_icon.addEventListener('click', (ev) => {
            api.deleteById(t.id)
            .then(() => api.getAllTodos())
            .then((todo_list) => view.renderTodos(todo_list, todo_container))
            .catch((err) => {
                console.log(err);
            });
        });
        todo.appendChild(delete_icon);
        
        todo_container.appendChild(todo);
    });
}

view.todoInputError = (todo_input_box) => {
    if (!todo_input_box.classList.contains('input-error')) {
        todo_input_box.classList.add('input-error');
        todo_input_box.placeholder = 'please enter a todo here';           
    }
}

const todo_container = document.querySelector('.todo-container');
const add_btn = document.getElementById('add-btn');
const todo_input_box = document.getElementById('todo-input');

api.getAllTodos()
.then((todo_list) => {
    view.renderTodos(todo_list, todo_container);
})
.catch((err) => {
    console.error(err);
});

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
});

function addTodoEventHandler(todo_input_box, todo_container) {
    const value = todo_input_box.value;

    if (value === null || value === '') {
        view.todoInputError(todo_input_box);
        return;
    }

    todo_input_box.value = '';

    api.addTodo({"todo" : value})
    .then((data) => api.getAllTodos())
    .then((todo_list) => view.renderTodos(todo_list, todo_container))
    .catch((err) => {
        console.error(err);
    })
}