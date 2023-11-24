package ua.knu.backend.dto.jwt;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String token;
}
