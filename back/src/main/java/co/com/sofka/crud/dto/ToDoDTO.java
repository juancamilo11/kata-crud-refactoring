package co.com.sofka.crud.dto;

import lombok.*;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ToDoDTO {

    private Long id;
    private String name;
    private List<TaskDTO> tasksList;

    public void addTask(TaskDTO task) {
        if(this.tasksList == null) {
            this.tasksList = new ArrayList<>();
        }
        this.tasksList.add(task);
    }
    
}
