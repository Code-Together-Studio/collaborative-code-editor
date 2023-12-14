package ua.knu.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity(name = "Change_Operation")
public class ChangeOperation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "code_snippet_id")
    private Integer codeSnippetId;

    @Column(name = "data_version")
    private Integer dataVersion;

    @Column(name = "operation")
    private String operation;

    @Column(name = "start_index")
    private Integer start;

    @Column(name = "end_index")
    private Integer end;

    @Column(name = "original_content")
    private String originalContent;
}
