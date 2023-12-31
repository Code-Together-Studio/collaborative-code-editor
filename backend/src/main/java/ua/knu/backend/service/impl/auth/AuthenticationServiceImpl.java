package ua.knu.backend.service.impl.auth;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.backend.exception.UserExistsException;
import ua.knu.backend.web.security.JwtAuthenticationResponse;
import ua.knu.backend.web.security.RefreshTokenRequest;
import ua.knu.backend.web.security.SignInRequest;
import ua.knu.backend.web.security.SignUpRequest;
import ua.knu.backend.entity.User;
import ua.knu.backend.repository.UserRepository;
import ua.knu.backend.service.AuthenticationService;
import ua.knu.backend.service.JWTService;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @SneakyThrows
    public User signUp(SignUpRequest signUpRequest){

        //check if user with this username exists
        if(userRepository.findByUsername(signUpRequest.getUsername()).isPresent()){
            throw new UserExistsException(signUpRequest.getUsername());
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return userRepository.save(user);
    }

    public JwtAuthenticationResponse signIn(SignInRequest signInRequest){
        //verify password and username
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUsername(),
                signInRequest.getPassword()));

        User user = userRepository.findByUsername(signInRequest.getUsername()).orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);

        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String username = jwtService.extractUsername(refreshTokenRequest.getToken());
        User user = userRepository.findByUsername(username).orElseThrow();
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());

            return jwtAuthenticationResponse;
        }
        return null;
    }
}
