package co.com.sofka.crud.service;

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

//    public ToDo save(ToDo todo){
//        return repository.save(todo);
//    }
//
//    public void delete(Long id){
//        repository.delete(get(id));
//    }
//
//    public ToDo get(Long id){
//         return repository.findById(id).orElseThrow();
//    }

}
