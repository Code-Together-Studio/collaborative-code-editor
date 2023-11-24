package ua.knu.backend.web.security;

import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String password;
}
