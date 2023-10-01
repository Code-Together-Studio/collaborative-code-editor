package ua.knu.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Session {
    private Integer id;
    private String title;
    private String codeSnippet;
    private Date createdAt;
    private boolean isPublic;
    private Folder folder;
}
