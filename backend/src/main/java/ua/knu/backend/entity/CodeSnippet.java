package ua.knu.backend.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CodeSnippet {
    private Integer id;
    private String name;
    private String content;
    private Date createdAt;
    private Date modifiedAt;
    private Folder parentFolder;
}
