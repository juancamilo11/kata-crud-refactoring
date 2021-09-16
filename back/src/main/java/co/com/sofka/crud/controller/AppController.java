package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.ToDoDTO;
import co.com.sofka.crud.entity.Task;
import co.com.sofka.crud.entity.ToDo;
import co.com.sofka.crud.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AppController {

    @Autowired
    private ToDoService service;

    //List all ToDos with all their dependencies
    @GetMapping(value = "api/todos")
    public Iterable<ToDo> listAllToDos(){
        return service.listAllToDos();
    }

    //Save an empty toDo list
    @PostMapping(value = "api/todo")
    public ToDo saveToDoList(@RequestBody ToDo toDo){
        return service.saveToDo(toDo);
    }

    //Save a new task
    @PostMapping(value = "api/todo/task")
    public Task saveATask(@RequestBody Task task){
        return service.saveTask(task);
    }

    //Delete an existing toDo list and its tasks
    @DeleteMapping(value = "api/todo/{id}")
    public void deleteToDo(@PathVariable("id") Long id){
        service.deleteToDo(id);
    }



//    @PutMapping(value = "api/todo")
//    public ToDo update(@RequestBody ToDo todo){
//        if(todo.getId() != null){
//            return service.save(todo);
//        }
//        throw new RuntimeException("No existe el id para actualziar");
//    }
//

//
//    @GetMapping(value = "api/{id}/todo")
//    public ToDo get(@PathVariable("id") Long id){
//        return service.get(id);
//    }

}
