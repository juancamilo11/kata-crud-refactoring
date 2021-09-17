package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.ToDoDTO;
import co.com.sofka.crud.entity.Task;
import co.com.sofka.crud.entity.ToDo;
import co.com.sofka.crud.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    //Update an existing task
    @PutMapping(value = "api/todo/task")
    public Task updateTask(@RequestBody Task task){
        return service.updateTask(task);
    }

    //Delete an existing toDo list and its tasks
    //Se le debe pasar un arreglo con sus respectivas tareas para eliminarlas antes de eliminar el ToDo
    @DeleteMapping(value = "api/todo/{id}")
    public void deleteToDo(@PathVariable("id") Long id, @RequestBody ArrayList<Long> idTasks){
        service.deleteToDo(id, idTasks);
    }

    //Delete an existing task
    @DeleteMapping(value = "api/todo/task/{id}")
    public void deleteTask(@PathVariable("id") Long id){
        service.deleteTask(id);
    }
}
