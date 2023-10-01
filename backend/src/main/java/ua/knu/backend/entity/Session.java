package ua.knu.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Entity(name = "Sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "code_snippet")
    private String codeSnippet;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "is_public")
    private boolean isPublic;

    @ManyToMany(mappedBy = "sessions")
    private List<User> users;

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", codeSnippet='" + codeSnippet + '\'' +
                ", createdAt=" + createdAt +
                ", isPublic=" + isPublic +
                ", users=" + users.stream().map(User::getUsername).collect(Collectors.toList()) +
                '}';
    }
}