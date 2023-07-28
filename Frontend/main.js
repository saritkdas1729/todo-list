const todo_list = ['Todo 11', 'Todo 22', 'Todo 33', 'Todo 44'];
const todo_container = document.querySelector('.todo-container');

console.log(todo_list);
console.log(todo_container);

todo_container.innerHTML = "";
todo_list.forEach((t) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.innerText=t;
    todo_container.appendChild(todo);
});