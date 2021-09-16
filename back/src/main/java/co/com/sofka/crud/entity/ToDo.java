package co.com.sofka.crud.entity;

import javax.persistence.*;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name="todo")
public class ToDo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name="id_todo")
    private List<Task> tasks;


    public ToDo(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ToDo() {
    }

    public ToDo(String name) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
