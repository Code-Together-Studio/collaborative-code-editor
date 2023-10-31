package ua.knu.backend.service;

import ua.knu.backend.dto.JwtAuthenticationResponse;
import ua.knu.backend.dto.RefreshTokenRequest;
import ua.knu.backend.dto.SignInRequest;
import ua.knu.backend.dto.SignUpRequest;
import ua.knu.backend.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signIn(SignInRequest signInRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
