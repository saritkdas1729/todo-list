package com.sarit.todolistbackend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todo")
@CrossOrigin
public class TodoController {
    
    static class TodoDTO {
        public String todo;

        public TodoDTO() {}
    }

    private List<TodoDTO> todoList;

    public TodoController() {
        this.todoList = new ArrayList<>();
        
        TodoDTO td;

        td = new TodoDTO();
        td.todo = "Learn SpringMVC";
        todoList.add(td);

        td = new TodoDTO();
        td.todo = "Create todo app rest api";
        todoList.add(td);
    }

    @GetMapping("/")
    public List<TodoDTO> getTodos() {
        return this.todoList;
    }

    @PostMapping("/")
    public TodoDTO addTodo(@RequestBody TodoDTO todo) {
        this.todoList.add(todo);
        return todo;
    }

}
