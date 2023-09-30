package ua.knu.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Folder {
    private Integer id;
    private String name;
    private Folder parent;
    private Date createdAt;
}
