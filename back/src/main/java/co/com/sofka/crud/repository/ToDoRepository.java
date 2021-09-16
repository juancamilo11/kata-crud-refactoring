package co.com.sofka.crud.repository;

import co.com.sofka.crud.entity.ToDo;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDo, Long> {
}
