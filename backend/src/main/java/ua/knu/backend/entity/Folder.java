package ua.knu.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity(name = "Folders")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "parentFolder", fetch = FetchType.EAGER) //TODO change to Lazy
    private List<Folder> childrenFolders;

    @ManyToOne
    @JoinColumn(name = "parent", referencedColumnName = "id")
    private Folder parentFolder;

    @Column(name = "created_at")
    private Date createdAt;

    @Override
    public String toString() {
        return "Folder{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", childrenFolders=" + childrenFolders.stream().map(Folder::getName).toList() +
                ", parentFolder=" + ((parentFolder == null) ? "it's highest folder" : parentFolder.getName()) +
                ", createdAt=" + createdAt +
                '}';
    }
}
