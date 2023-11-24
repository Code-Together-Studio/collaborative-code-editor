package ua.knu.backend.dto.jwt;

import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String password;
}
