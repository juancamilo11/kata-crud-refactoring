package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.Task;
import co.com.sofka.crud.entity.ToDo;
import co.com.sofka.crud.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    @Autowired
    private TaskRepository taskRepository;

    public Iterable<ToDo> listAllToDos(){
        return toDoRepository.findAll();
    }

    public ToDo saveToDo(ToDo toDo){
        return toDoRepository.save(toDo);
    }

    public Task saveTask(Task task) {
        if(!toDoRepository.existsById(task.getIdTodo())) {
            throw new RuntimeException("ToDo list with id " + task.getId() + " not found, try with another toDo list.");
        }
        return taskRepository.save(task);
    }

    public void deleteToDo(Long id){
        if(!toDoRepository.existsById(id)) {
            throw new RuntimeException("ToDo list with id " + id + " was not found.");
        }
        toDoRepository.deleteById(id);
    }

//    public ToDo get(Long id){
//         return repository.findById(id).orElseThrow();
//    }

}
