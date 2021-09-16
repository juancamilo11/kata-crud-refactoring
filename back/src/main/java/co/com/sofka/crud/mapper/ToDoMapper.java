package co.com.sofka.crud.mapper;

import co.com.sofka.crud.dto.ToDoDTO;
import co.com.sofka.crud.entity.ToDo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ToDoMapper {

    ToDoMapper INSTANCE = Mappers.getMapper(ToDoMapper.class);

    ToDo toEntity(ToDoDTO toDoDTO);

    ToDoDTO toDTO(ToDo ToDoDAO);

    default List<ToDoDTO> toDTOList(List<ToDo> toDoList) {
        if(toDoList == null) {
            return new ArrayList<>();
        }
        return toDoList.stream().map(this::toDTO).collect(Collectors.toList());
    }
}

