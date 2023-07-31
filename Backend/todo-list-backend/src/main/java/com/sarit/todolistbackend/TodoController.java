package com.sarit.todolistbackend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        public Boolean completed;

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
        e.completed = false;
        e = todoRepository.save(e);
        return toTodoDTO(e);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    @Transactional
    public TodoDTO updateTodo(@PathVariable Long id, @RequestBody TodoDTO dto) throws ApiException {
        TodoEntity e = todoRepository.findById(id).orElseThrow(() -> new ApiException("Todo with id=" + id + " not found", HttpStatus.NOT_FOUND));
        if (dto.todo != null) e.todo = dto.todo;
        if (dto.completed != null) e.completed = dto.completed;
        e = todoRepository.save(e);
        return toTodoDTO(e);
    }

    private TodoDTO toTodoDTO(TodoEntity e) {
        TodoDTO dto = new TodoDTO();
        dto.id = e.id;
        dto.todo = e.todo;
        dto.completed = e.completed;
        return dto;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exceptionHandler(Exception e) {
        Map<String, Object> body = new HashMap<>();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        
        if (e instanceof ApiException) {
            ApiException e_ = (ApiException)e;
            status = e_.getStatus();
        }

        body.put("status", status);
        body.put("message", e.getMessage());
        body.put("exception", e.getClass().getSimpleName());
        return ResponseEntity.status(status).body(body);
    }

}
