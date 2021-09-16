package co.com.sofka.crud.repository;

import co.com.sofka.crud.entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}
