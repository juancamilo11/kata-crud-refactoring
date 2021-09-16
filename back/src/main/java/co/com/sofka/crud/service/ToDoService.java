package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.ToDo;
import co.com.sofka.crud.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository repository;

    public Iterable<ToDo> list(){
        return repository.findAll();
    }

    public ToDo save(ToDo todo){
        return repository.save(todo);
    }

    public void delete(Long id){
        repository.delete(get(id));
    }

    public ToDo get(Long id){
         return repository.findById(id).orElseThrow();
    }

}
