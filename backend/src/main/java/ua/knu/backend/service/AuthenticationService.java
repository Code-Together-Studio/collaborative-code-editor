package ua.knu.backend.service;

import ua.knu.backend.dto.jwt.JwtAuthenticationResponse;
import ua.knu.backend.dto.jwt.RefreshTokenRequest;
import ua.knu.backend.dto.jwt.SignInRequest;
import ua.knu.backend.dto.jwt.SignUpRequest;
import ua.knu.backend.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signIn(SignInRequest signInRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
