package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.Task;
import co.com.sofka.crud.entity.ToDo;
import co.com.sofka.crud.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    //Se le debe pasar un arreglo con sus respectivas tareas para eliminarlas antes de eliminar el ToDo
    public void deleteToDo(Long id, ArrayList<Long> idTasks){
        if(!toDoRepository.existsById(id)) {
            throw new RuntimeException("ToDo list with id " + id + " was not found.");
        }
        idTasks.forEach(idTask -> taskRepository.deleteById(idTask));
        toDoRepository.deleteById(id);
    }

    public void deleteTask(Long id) {
        if(!taskRepository.existsById(id)) {
            throw new RuntimeException("Task with id " + id + " was not found.");
        }
        taskRepository.deleteById(id);
    }

    public Task updateTask(Task task) {
        if(!taskRepository.existsById(task.getId())) {
            throw new RuntimeException("Task with id " + task.getId() + " was not found.");
        }
        return taskRepository.save(task);
    }
}
