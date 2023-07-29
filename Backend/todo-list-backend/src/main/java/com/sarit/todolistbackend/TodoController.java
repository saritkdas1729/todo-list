package com.sarit.todolistbackend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
        public Long id;
        public String todo;

        public TodoDTO() {}
    }

    private TodoRepository todoRepository;

    @Autowired
    public TodoController(TodoRepository todoRepository) {        
        this.todoRepository = todoRepository;
    }

    @GetMapping("/")
    public List<TodoDTO> getTodos() {
        return todoRepository.findAll().stream().map((e) -> toTodoDTO(e)).toList();
    }

    @PostMapping("/")
    public TodoDTO addTodo(@RequestBody TodoDTO todo) {
        TodoEntity e = new TodoEntity();
        e.todo = todo.todo;
        e = todoRepository.save(e);
        return toTodoDTO(e);
    }

    private TodoDTO toTodoDTO(TodoEntity e) {
        TodoDTO dto = new TodoDTO();
        dto.id = e.id;
        dto.todo = e.todo;
        return dto;
    }

}
