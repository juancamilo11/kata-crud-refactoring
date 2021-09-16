package co.com.sofka.crud.dto;

import lombok.*;
import javax.persistence.*;

import javax.persistence.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private Long id;
    private String name;
    private boolean completed;
    private Long idTodo;

}

