package ua.knu.backend.web.security;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String token;
}
