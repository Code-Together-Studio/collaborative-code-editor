package ua.knu.backend.web.security;

import lombok.Data;

@Data
public class SignInRequest {
    private String username;
    private String password;
}
