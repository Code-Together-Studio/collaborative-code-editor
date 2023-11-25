package ua.knu.backend.service;

import ua.knu.backend.web.security.JwtAuthenticationResponse;
import ua.knu.backend.web.security.RefreshTokenRequest;
import ua.knu.backend.web.security.SignInRequest;
import ua.knu.backend.web.security.SignUpRequest;
import ua.knu.backend.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signIn(SignInRequest signInRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
