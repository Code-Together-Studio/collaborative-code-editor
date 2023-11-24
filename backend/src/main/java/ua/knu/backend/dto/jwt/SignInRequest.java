package ua.knu.backend.dto.jwt;

import lombok.Data;

@Data
public class SignInRequest {
    private String username;
    private String password;
}
