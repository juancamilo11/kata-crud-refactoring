package co.com.sofka.crud.entity;

import javax.persistence.*;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="todo")
public class ToDo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

//    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
//    @JoinColumn(name="course_id")
//    private List<Task> tasks;
}
