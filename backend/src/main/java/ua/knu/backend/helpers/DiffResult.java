package ua.knu.backend.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DiffResult {
    private Integer fileId;
    private Integer originalDataVersion;
    private String content;
}
