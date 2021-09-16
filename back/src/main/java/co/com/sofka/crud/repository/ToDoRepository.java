package co.com.sofka.crud.repository;

import co.com.sofka.crud.Todo;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<Todo, Long> {
}
