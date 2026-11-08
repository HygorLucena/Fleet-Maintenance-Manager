package com.fleetmaintenance.auth;

import com.fleetmaintenance.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final DatabaseUserDetailsService userDetailsService;
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, DatabaseUserDetailsService userDetailsService) {
        this.authenticationManager=authenticationManager; this.jwtService=jwtService; this.userDetailsService=userDetailsService;
    }
    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(),request.password()));
            var principal=userDetailsService.loadUserByUsername(request.email());
            return new TokenResponse(jwtService.generateToken(principal),"Bearer",principal.getUsername());
        } catch(RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid credentials");
        }
    }
    public record LoginRequest(@NotBlank @Email String email,@NotBlank String password){}
    public record TokenResponse(String accessToken,String tokenType,String email){}
}
