package co.com.sofka.crud.mapper;

import co.com.sofka.crud.dto.TaskDTO;
import co.com.sofka.crud.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    Task toEntity(TaskDTO taskDTO);

    TaskDTO toDTO(Task taskDAO);

    default List<TaskDTO> toDTOList(List<Task> tasksList) {
        if(tasksList == null) {
            return new ArrayList<>();
        }
        return tasksList.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
