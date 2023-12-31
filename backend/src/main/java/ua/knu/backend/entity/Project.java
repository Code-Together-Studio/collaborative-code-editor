package ua.knu.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "hidden_root_folder_id")
    private Integer hiddenRootFolderId;

    @Column(name = "authenticated_only")
    private boolean authenticatedOnly;

    public Project(String title, boolean authenticatedOnly, Integer hiddenRootFolderId) {
        this.title = title;
        this.authenticatedOnly = authenticatedOnly;
        this.hiddenRootFolderId = hiddenRootFolderId;
        this.createdAt = new Date();
    }

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", createdAt=" + createdAt +
                ", authenticatedOnly=" + authenticatedOnly +
                '}';
    }
}
